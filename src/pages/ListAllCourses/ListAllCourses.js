import React, { useCallback, useEffect, useState } from 'react';
import './ListAllCourses.scss';
import Pagination from '../../components/Pagination/Pagination';
import { useAPIContext } from '../../contexts/APIContextProvider';
import { Button, Card, InputSearch, InputSelect } from '../../common/Index';
import ListInstrumentsScroll from '../../components/ListInstrumentsScroll/ListInstrumentsScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from "@fortawesome/free-solid-svg-icons";
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
    const [searchValue , setSearchValue] = useState('');
    const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "professeurs" }]);
    const [optionsCategory, setOptionsCategory] = useState([{ value: "", label: "catégories" }]);
    const [optionsCompositors, setOptionsCompositor] = useState([{ value: "", label: "compositeurs" }]);
    const { fetchData } = useAxiosFetchCourse();

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    const truncatedDatas = useCallback((dataElement) =>  {
      if( dataElement && dataElement.length > 0){
        const currentElemnt = dataElement && dataElement.slice(startIndex, endIndex);
        setCurrentData(currentElemnt);
        const totalElement = Math.ceil(dataElement && dataElement.length / itemsPerPage);
        setTotalPages(totalElement)
      }
    },[endIndex,startIndex]);

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
      const finalDataProfessor = [
        ...optionsProfessors,
        ...filterProfessor
      ];
      setOptionsProfessors(finalDataProfessor);
    },[optionsProfessors])
  
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
      const finalDatacategory = [
        ...optionsCategory,
        ...filterCategory
      ];
      setOptionsCategory(finalDatacategory);
    },[optionsCategory]);
  
    const getComposers = useCallback((response) => {
      let stockComposerName = [];
      const composers = response.map((e) => {
        stockComposerName.push(e.composers[0].fullName);
        let objtValue = {};
        let coco = stockComposerName.filter(x => x === e.composers[0].fullName).length;
        if( coco === 1 ){
          objtValue = {
            value: e.composers[0].id,
            label: e.composers[0].fullName
          }
        }
        return objtValue;
      });
      const asArray = Object.values(composers);
      const filteredComposers = Object.values(asArray).filter((value) => Object.keys(value).length !== 0);
      const finalDataComposers = [
        ...optionsCompositors,
        ...filteredComposers
      ];
      setOptionsCompositor(finalDataComposers);
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
          setData(response);
          truncatedDatas(response);
        } catch (error) {
          console.error(error);
        }
      }
      
       if(data && Object.values(data).length === 0){
        getData(); 
       }

       if( data && data.length > 1 ) {
        if(optionsProfessors.length === 1){
          getProfessorForOption(data);
        }
        if(optionsCategory.length === 1){
          getCategory(data);
        }
        if(optionsCompositors.length === 1){
          getComposers(data);
        }
      }
    },[data,courseAPI,optionsProfessors,getProfessorForOption ,optionsCategory ,optionsCompositors.length, getComposers , getCategory ,truncatedDatas]);

  return (
  <div className='all-cours-show'>
    
        <div className='sortCours'>
          <div className="container-line">
            <h5 className="overlay">
              <FontAwesomeIcon icon={faSliders} />  
              <span> Filtres </span>            
            </h5>
          </div>
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

                <InputSearch
                  value={searchValue}
                  placeholder="Rechercher"
                  onChange={(e)=> setSearchValue(e.target.value)}
                /> 

                <div>
                  <Button kind={"primary"} onClick={searchCoursesDatas}> Rechercher</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className='all-courses'>
        {currentData.map((value, index) => (
          <li key={index} >
            <Card
              id={value.id}
              imgSrc={value.photo !== '' ? value.photo :"https://i1.sndcdn.com/artworks-000236202373-bjmc48-t500x500.jpg"}
              imgAlt="Cours de Violon"
              title={value.title}
              rating={value.ratingScore}
              shortDescription={value.preview}
              longDescription={value.description}
              professorName={`${value.professor.firstName} ${value.professor.lastName}`}
              linkTo={`/courses/${value.id}`}
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




ListAllCourses.propTypes = {};

ListAllCourses.defaultProps = {};

export default ListAllCourses;
