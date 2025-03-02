import React, { useCallback, useContext,useEffect,useRef,useState } from "react";
import "./ListLearningTracking.scss";
import {  ContainerSidebarAndContent } from "../../components";
import { Button, InputSearch, InputSelect } from "../../common/Index";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import CardLearningTracking from "../../components/CardLearningTracking/CardLearningTracking";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";
import { checkEmptyValue, useAxiosFetchApprentissage} from '../../hooks/axiosFetch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark ,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useInstrumentContext } from "../../contexts/InstrumentProvider";


const ListLearningTracking = () =>  { 

  const { courseAPI } = useAPIContext();
  const { userId } = useContext(AuthContext);
  const {handleInstrument } = useInstrumentContext();
  const [selectedProfessor, setSelectedProfessor ] = useState("");
  const [selectedStatus, setSelectedStatus ] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading , setIsLoading ] = useState(true);
  const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "professeur" }]);
  const [optionsInstruments, setOptionsInstruments] = useState([{ value: "", label: "instruments" }]);
  const [optionsCompositors, setOptionsCompositor] = useState([{ value: "", label: "compositeur" }]);
  const optionsStatus = [
      {value: "", label: "status" },
      {value: "NOT_STARTED", label: "Non commencé" },
      {value: "IN_PROGRESS", label: "En cours" },
      {value: "FINISHED", label: "Terminé" }
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchDataApprentissage } = useAxiosFetchApprentissage();
  const dataFetchedRef = useRef(false);

  const cleanSelectedInputs = () => {
    setSelectedProfessor('');
    setSearchValue('');
    handleInstrument('');
    window.location.reload(true);
  };

  const getDataLearningPagesNext = async () => {
    try {
      setCurrentData([]);
      const response = await courseAPI.showCourseByUser(userId);
      const datasCourses = response.map((e) => e.course);
      truncatedDatas(datasCourses);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentData([]);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getDataLearningPagesNext();
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

  /** Permet de supprimer un object qui serait un doublon grace à son ID  */
  const  filterDuplicateName = (arrayObject) => {
    const valueCounts = {};    
    const filteredArray = [];
    arrayObject.forEach(obj => {
      const { value } = obj;
      if (!valueCounts[value]) {
        valueCounts[value] = 1;
        filteredArray.push(obj);
      } else {
        valueCounts[value]++;
      }
    });
    return filteredArray;
  }


  const strLcFirst = (value) => {
    return (value + "").charAt(0).toUpperCase() + value.substr(1);
  };

  /** Permet d'aplatir un tableau d'object   */
  const getFlattenArray = (arrayElement) => {
    const flattenArray = arrayElement.reduce((acc, sousTableau) => {
      return acc.concat(sousTableau);
    }, []);
    return flattenArray;
  };

  const getProfessorForOption = useCallback((response) => {
    const professor = response.map((e) => {
      let objtValue = {
        value: e?.professor?.id,
        label: strLcFirst(e?.professor?.firstName) + ' ' + e?.professor?.lastName.toUpperCase()
      }
      return objtValue ;
    });

    const datas = getFlattenArray(professor);
    const filteredArray = filterDuplicateName(datas);    
    setOptionsProfessors([
      ...optionsProfessors,
      ...filteredArray
    ]);
  },[optionsProfessors])

  const getInstruments = useCallback((response) => {
    const instrument = response.map((e) => {
      let objtValue = {
        value: e.instrument?.id,
        label: e.instrument?.name
      }
      return objtValue;
    });
    const datas = getFlattenArray(instrument);
    const filteredArray = filterDuplicateName(datas);
    setOptionsInstruments([
      ...optionsInstruments,
      ...filteredArray
    ]);
  },[optionsInstruments])

  const getComposers = useCallback((response) => {
    const composers = response.map((e) => {
      let objtValue = {
        value: e.composers[0]?.id,
        label: e.composers[0]?.fullName
      }
      return objtValue;
    });
    const datas = getFlattenArray(composers);
    const filteredArray = filterDuplicateName(datas);
    setOptionsCompositor([
      ...optionsCompositors,
      ...filteredArray
    ]);
  },[optionsCompositors])
 
  const changeData = () => {

    const datasCourses = currentData.map((value,index) => {
        return (
          <li key={index}>
              <CardLearningTracking
                imgSrc={value?.photo}
                imgAlt="Cours de Violon"
                title={value?.title}
                valueProgress={value?.percentageWatched ? value?.percentageWatched  : '0'}
                rating={value?.ratingScore}
                longDescription={value?.description}
                professorName={`${value?.professor?.firstName} ${value?.professor?.lastName}`}
                linkTo={`/courses/${value?.id}`}
              />
          </li>
        );
    });
    return datasCourses;
  };

  /** création d'un nouvel object en applatissant les paires clé-valeur de la réponse API  */
  const currentDataFlatten = (response) => {

    const flattenobjCourse = response.map((e) => {
            if (e.course) {
              const { course, ...rest } = e;
              return { ...rest, ...course };
            }
            return e;
    });

    return flattenobjCourse;
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        
        const response = await courseAPI.showCourseByUser(userId);
          if( Object.keys(response).length > 0) {
            const datasCourses = currentDataFlatten(response);
            const currentElemnt = datasCourses && datasCourses.slice(startIndex, endIndex);
            setCurrentData(currentElemnt);
            const totalElement = Math.ceil(datasCourses && datasCourses.length / itemsPerPage);
            setTotalPages(totalElement);
            getProfessorForOption(currentElemnt);
            getInstruments(currentElemnt);
            getComposers(currentElemnt);
            setIsLoading(false);

          } else {
            setIsLoading(false);
          }
  
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if(currentData && Object.values(currentData).length === 0 && userId && !dataFetchedRef.current){
      getData(); 
      dataFetchedRef.current = true;
    }

  },[isLoading,courseAPI,userId, optionsCompositors , optionsProfessors ,getComposers,getInstruments,getProfessorForOption ,startIndex ,endIndex , currentData]);



  const handleFilter= () => {

    const index = {
      professorId : selectedProfessor !== '' ? parseInt(selectedProfessor) : '',
      status: selectedStatus,
      title: searchValue
    };

    if (checkEmptyValue(index)) {
      fetchDataApprentissage(index).then((values) => {
        if( values ) {
          const datasCourses = currentDataFlatten(values);
          setCurrentData([]);
          truncatedDatas(datasCourses);
          return;
        }
      });
      return ;

    } else {
      fetchDataApprentissage(index).then((values) => {
        const datasCourses = currentDataFlatten(values);
        setCurrentData([]);
        truncatedDatas(datasCourses);
        return;
      });
    }
  };


  return (
    <ContainerSidebarAndContent>
        <div className='form-sort form-learning-list'>
            <InputSelect
              label={("professeur").toUpperCase()}
              options={optionsProfessors}
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
            />
            <InputSelect
              label={("Status").toUpperCase()}
              options={optionsStatus}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            <InputSearch 
              value={searchValue} 
              placeholder="Rechercher..."  
              onChange={(e) => setSearchValue(e.target.value)} 
            />
            <div className="clear-all-sort">
              <button onClick={cleanSelectedInputs}> 
                <FontAwesomeIcon icon={faCircleXmark} />
                <small> Nettoyer</small>
              </button>
            </div>
            <div className="clear-all-sort">
              <Button kind={"primary"} onClick={handleFilter}> 
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Filtrer
              </Button>
            </div>
        </div>


        <div className="content-area">
          { isLoading ?
            (
              <>
                <LoadingElements />
              </>
            ) : (
              <>
                <ul className="list-courses-learning-tracking">
                  {( currentData && Object.values(currentData).length > 0 ) ? (
                    changeData()
                  ) : (
                    <p>
                      Nous n'avons aucun élément à afficher
                    </p>
                  )}   
                </ul>
                
                <div className="zone-pagination" >
                  <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
              </>
            )       
          }
        </div>

    </ContainerSidebarAndContent>
  );
};


export default ListLearningTracking;
