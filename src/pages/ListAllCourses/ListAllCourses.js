import React, { useCallback, useEffect, useState } from 'react';
import './ListAllCourses.scss';
import Pagination from '../../components/Pagination/Pagination';
import { useAPIContext } from '../../contexts/APIContextProvider';
import { Button, Card, InputSelect } from '../../common/Index';
import ListInstrumentsScroll from '../../components/ListInstrumentsScroll/ListInstrumentsScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark , faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import LoadingElements from '../../components/LoadingElements/LoadingElements';
import { useAxiosFetchCourse } from '../../hooks/axiosFetch';
import { useInstrumentContext } from '../../contexts/InstrumentProvider';

const ListAllCourses = () => {

    const [data, setData] = useState([]);
    const { courseAPI } = useAPIContext();
    const { instrumentSelected } = useInstrumentContext();
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [currentData, setCurrentData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedProfessor, setSelectedProfessor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompositor, setSelectedCompositor] = useState("");
    const [searchValue , setSearchValue] = useState("");
    const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "professeurs" }]);
    const [optionsCategory, setOptionsCategory] = useState([{ value: "", label: "catégories" }]);
    const [optionsCompositors, setOptionsCompositor] = useState([{ value: "", label: "compositeurs" }]);
    const { fetchData } = useAxiosFetchCourse();


    const getDataPagesNext = async () => {
      try {
        setCurrentData([]);
        const response = await courseAPI.showAll();
        truncatedDatas(response);
      } catch (error) {
        console.error(error);
      }
    }

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        getDataPagesNext(); 
      }
    };

    const truncatedDatas = (dataElement) =>  {
      setCurrentData([]);
      if( dataElement && dataElement.length > 0){
        const currentElemnt = dataElement && dataElement.slice(startIndex, endIndex);
        setCurrentData(currentElemnt);
        const totalElement = Math.ceil(dataElement && dataElement.length / itemsPerPage);
        setTotalPages(totalElement)
      }
    };

    /** Crée la liste de prof à sélectionner */
    const getProfessorForOption = useCallback((response) => {
      let index = 0;
      let tabProfessor = [];
      const professor = response.map((e) => {
        let username = e.professor.firstName + ' ' + e.professor.lastName;
        let objtValue = {};
        tabProfessor.push(username);
        let coco = tabProfessor.filter(x => x === username).length;
        if( coco === 1 ){
          objtValue = {
            value: index+=1,
            label: username
          }
        }
        return objtValue ;
      }) ;
      const asArray = Object.values(professor);
      const filterProfessor = Object.values(asArray).filter((value) => Object.keys(value).length !== 0);
      setOptionsProfessors([...optionsProfessors,...filterProfessor ]);
    },[optionsProfessors])
  

    /** Crée la liste des catégories à sélectionner */
    const getCategory = useCallback((response) => {
      let tabCategory = [];
  
      const category = response.map((e) => {
        tabCategory.push(e.categories[0].name);
        let objtValue = {};
        let coco = tabCategory.filter(x => x === e.categories[0].name).length;
  
        if( coco === 1 ){
          objtValue = {
            value: e.categories[0].id,
            label: e.categories[0].name
          }
        }
        return objtValue;
      });
      const asArray = Object.values(category);
      const filterCategory = Object.values(asArray).filter((value) => Object.keys(value).length !== 0);
      setOptionsCategory([
        ...optionsCategory,
        ...filterCategory
      ]);
    },[optionsCategory]);
  
    /** Crée la liste des compositeurs à sélectionner */
    const getComposers = useCallback((response) => {
      let stockComposerName = [];
      const composers = response.map((e) => {
        let objtValue = {};
        if( e?.composers[0]?.fullName){
          stockComposerName.push(e?.composers[0]?.fullName);
        }

        let sortedArrayName = stockComposerName.filter(nameComposer => nameComposer === e.composers[0]?.fullName).length;
        if( sortedArrayName === 1 ){
          objtValue = {
            value: e.composers[0]?.id,
            label: e.composers[0]?.fullName
          }
        }
        return objtValue;
      });
      const asArray = Object.values(composers);
      const filteredComposers = Object.values(asArray).filter((value) => Object.keys(value).length !== 0);
      setOptionsCompositor([
        ...optionsCompositors,
        ...filteredComposers
      ]);
    },[optionsCompositors]);

    const checkEmptyValue = (obj) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== '') {
          return true;
        }
      }
      return false;
    }
  
    const searchCoursesDatas = () => {
  
      let index = {
        professorId :selectedProfessor,
        instrumentName :instrumentSelected,
        categoryId : selectedCategory,
        composerId :selectedCompositor,
        title : searchValue
      };
  
      if (checkEmptyValue(index)) {
        fetchData(index).then((e) => {
          // truncatedDatas(e);
          setData([]);
          setData(e);
        });
        return ;
  
      } else {
        fetchData(index).then((e) => {
          setData([]);
          setData(e);
        });
      }
    };
  

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await courseAPI.showAll();
          const currentElemnt = response && response.slice(startIndex, endIndex);
          setCurrentData(currentElemnt);
          const totalElement = Math.ceil(response && response.length / itemsPerPage);
          setTotalPages(totalElement);

        } catch (error) {
          console.error(error);
        }
      }
      
       if(currentData && Object.values(currentData).length === 0){
        getData(); 
       }

      if( currentData && currentData.length > 1 ) {
        if(optionsProfessors.length === 1){
          getProfessorForOption(currentData);
        }
        if(optionsCategory.length === 1){
        getCategory(currentData);
        }
        if(optionsCompositors.length === 1){
          getComposers(currentData);
        }
      }
    },[data,courseAPI,optionsProfessors,getProfessorForOption ,optionsCategory ,optionsCompositors.length, getComposers , getCategory ,startIndex, endIndex ,currentData]);

  return (
  <div className='all-cours-show'>
    

          <div className="global-forms-container">
            <div className="container-forms">
              < ListInstrumentsScroll />
              <div className="introduction-forms">
                <InputSelect
                  label={("Professeurs").toUpperCase()}
                  options={optionsProfessors}
                  value={selectedProfessor}
                  onChange={(e) => setSelectedProfessor(e.target.value)}
                />

                <InputSelect
                  label={("Catégories").toUpperCase()}
                  options={optionsCategory}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />

                <InputSelect
                  label={("Compositeurs").toUpperCase()}
                  options={optionsCompositors}
                  value={selectedCompositor}
                  onChange={(e) => setSelectedCompositor(e.target.value)}
                />

                <div className='clear-all-sort'>
                  <button> 
                      <FontAwesomeIcon icon={faCircleXmark} />
                      <small> Nettoyer</small>
                  </button>
                </div>
                <div className='clear-all-sort'>
                  <Button kind={"primary"} onClick={searchCoursesDatas}> 
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Filtrer
                  </Button>
                </div>
              </div>
            </div>
          </div>


        <ul className='all-courses'>
        {currentData.map((value, index) => (
          <li key={index} >
            <Card
              id={value?.id}
              imgSrc={value?.photo}
              imgAlt="Cours de Violon"
              title={value?.title}
              rating={value?.ratingScore}
              shortDescription={value?.preview}
              longDescription={value?.description}
              professorName={`${value?.professor?.firstName} ${value?.professor?.lastName}`}
              linkTo={`/courses/${value?.id}`}
              />
          </li>
        ))}
        </ul>

    { Object.values(currentData).length > 0 ?
        <div className='gestion-pages pagination'>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div> : 
        (
          <>
            <LoadingElements />
          </>
        )
    } 

  </div>
)};

export default ListAllCourses;
