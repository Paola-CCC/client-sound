import React, { useCallback, useContext,useEffect,useState } from "react";
import "./ListLearningTracking.scss";
import { ContainerContent, ContainerSidebarAndContent,  Sidebar } from "../../components";
import { Button, InputSearch, InputSelect } from "../../common/Index";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import CardLearningTracking from "../../components/CardLearningTracking/CardLearningTracking";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";
import { checkEmptyValue, useAxiosFetchApprentissage} from '../../hooks/axiosFetch';


const ListLearningTracking = () =>  { 

  const { courseAPI } = useAPIContext();
  const { userId } = useContext(AuthContext);
  const [selectedProfessor, setSelectedProfessor ] = useState("");
  const [selectedStatus, setSelectedStatus ] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading , setIsLoading ] = useState(true);
  const [data, setData] = useState([]);
  const [countRender, setCountRender] = useState(0);
  const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "professeurs" }]);
  const [optionsInstruments, setOptionsInstruments] = useState([{ value: "", label: "instruments" }]);
  const [optionsCompositors, setOptionsCompositor] = useState([{ value: "", label: "compositeurs" }]);
  const [optionsStatus, setOptionsStatus] = useState([
      {value: "", label: "status" },
      {value: "NOT_STARTED", label: "Non commencé" },
      {value: "IN_PROGRESS", label: "En cours" },
      {value: "FINISHED", label: "Terminé" }
    ]);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchDataApprentissage } = useAxiosFetchApprentissage();


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const truncatedDatas = useCallback((dataElement) =>  {
    setCurrentData([]);
    setTotalPages([])
    if( dataElement && dataElement.length > 0){
      const currentElemnt = dataElement && dataElement.slice(startIndex, endIndex);
      setCurrentData(currentElemnt);
      const totalElement = Math.ceil(dataElement && dataElement.length / itemsPerPage);
      setTotalPages(totalElement)
    }
  },[endIndex,startIndex]);

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
        value: e.professor.id,
        label:  strLcFirst(e.professor.firstName) + ' ' + e.professor.lastName.toUpperCase()
      }
      return objtValue ;
    });

    const datas = getFlattenArray(professor);
    const filteredArray = filterDuplicateName(datas);
    const finalDataProfessor = [
      ...optionsProfessors,
      ...filteredArray
    ];
    
    setOptionsProfessors(finalDataProfessor);
  },[optionsProfessors])

  const getInstruments = useCallback((response) => {
    const instrument = response.map((e) => {
      let objtValue = {
        value: e.instrument.id,
        label: e.instrument.name
      }
      return objtValue;
    });
    const datas = getFlattenArray(instrument);
    const filteredArray = filterDuplicateName(datas);
    const finalDataInstrument = [
      ...optionsInstruments,
      ...filteredArray
    ];
    setOptionsInstruments(finalDataInstrument);
  },[optionsInstruments])

  const getComposers = useCallback((response) => {
    const composers = response.map((e) => {
      let objtValue = {
        value: e.composers[0].id,
        label: e.composers[0].fullName
      }
      return objtValue;
    });
    const datas = getFlattenArray(composers);
    const filteredArray = filterDuplicateName(datas);
    const finalDataComposers = [
      ...optionsCompositors,
      ...filteredArray
    ];
    setOptionsCompositor(finalDataComposers);
  },[optionsCompositors])
 

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await courseAPI.showCourseByUser(userId);
        if( response && response !== undefined && response !== null) {
          if( Object.keys(response[0]).includes('course')){
            // setData(response);
            truncatedDatas(response);
            let datasCourses = response.map((e) => e.course);
            setIsLoading(false);
            getProfessorForOption(datasCourses);
            getInstruments(datasCourses);
            getComposers(datasCourses);
          } else {
            setIsLoading(false);
          }
  
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if( data.length < 1 && countRender <= 2 && userId !== null ){
      setCountRender((prevCount) => prevCount + 1);
      getData(); 
    }
  },[data,isLoading,courseAPI,userId,countRender ,getComposers,getInstruments,getProfessorForOption,truncatedDatas]);


  const changeData = () => {

    let index = Object.values(currentData).map((elements,index) => {
        let value = elements.course;
        let professor = `${value.professor.firstName} ${value.professor.lastName}`;
        return (
            <CardLearningTracking
            key={index}
            imgSrc={value.photo !== '' ? value.photo :"https://i1.sndcdn.com/artworks-000236202373-bjmc48-t500x500.jpg"}
            imgAlt="Cours de Violon"
            title={value.title}
            valueProgress={elements.percentageWatched ? elements.percentageWatched  : '0'}
            rating={value.ratingScore}
            shortDescription={value.preview}
            longDescription={value.description}
            professorName={professor}
            linkTo={`/courses/${value.id}`}
            />
          );
    });
    return index;
  };


  const handleFilter= () => {

    let index = {
      professorId : parseInt(selectedProfessor),
      status: selectedStatus,
      title: searchValue
    };

    if (checkEmptyValue(index)) {
      fetchDataApprentissage(index).then((e) => {
        console.log(' Index ' , index)
        truncatedDatas(e);
        return;
      });
      return ;

    } else {
      fetchDataApprentissage(index).then((e) => {
        console.log(' Index MM' , index)

        truncatedDatas(e);
        return;
      });
    }
  };


  return (
    <ContainerSidebarAndContent>
        <Sidebar>
          <InputSelect
            label={("Professeurs").toUpperCase()}
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
          <InputSearch value={searchValue} placeholder="Rechercher"  onChange={(e) => setSearchValue(e.target.value)} />
          <div>
            <Button kind={"primary"} onClick={handleFilter}> Rechercher</Button>
          </div>
        </Sidebar>
      <ContainerContent>
        { isLoading ?
          (
            <>
              <LoadingElements />
            </>
          ) : (
            <>

            <section className="list-courses-learning-tracking">
            {( currentData && Object.values(currentData).length > 0 ) ? (
              <>
                {  changeData()}
              </>

            ) : (
              <p>
                Nous n'avons aucun élément à afficher
              </p>
            )}   
            </section>
            <div className="zone-pagination" >
            { currentData && Object.values(currentData).length > itemsPerPage  && (
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            )}
            </div>
            
            </>

          )       
        }
      </ContainerContent>
    </ContainerSidebarAndContent>
  );
};


export default ListLearningTracking;
