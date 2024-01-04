import React, { useCallback, useContext, useEffect, useState } from "react";
import "./ListStudentsTracking.scss";
import { ContainerContent, ContainerSidebarAndContent, Sidebar } from "../../components";
import { InputSearch, InputSelect } from "../../common/Index";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import CardStudentsTracking from "../../components/CardStudentsTracking/CardStudentsTracking";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const ListStudentsTracking = () => {

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedCompositor, setSelectedCompositor] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { courseAPI } = useAPIContext();
  const { userId } = useContext(AuthContext);
  const [ isLoading , setIsLoading ] = useState(false);
  const [ data, setData ] = useState([]);
  const [ countRender,setCountRender ] = useState(0);
  const [ optionsStudents,setOptionsStudents] = useState([{ value: "", label: "élèves" }]);
  const [ optionsInstruments,setOptionsInstruments ] = useState([{ value: "", label: "instruments" }]);
  const [ optionsCompositors,setOptionsCompositor ] = useState([{ value: "", label: "compositeurs" }]);


  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  // tronque le tableau sur la partie désirée
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


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

  /** Permet de créer une liste d'élèves  */
  const getStudents = useCallback((response) => {
    const students = response.map((element) => {
      let index = element.users.map((e) => {
        return {
          value: e.id,
          label: strLcFirst(e.firstName) + ' ' + e.lastName.toUpperCase()
        }
      })
      return index ;
    });

    const datas = getFlattenArray(students);
    const filteredArray = filterDuplicateName(datas);
    const finalDataInstrument = [
     ...optionsStudents,
      ...filteredArray 
    ];
    setOptionsStudents(finalDataInstrument);
  },[optionsStudents]);


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

    const getData = async() => {
    setIsLoading(true)
    try {
      const response = await courseAPI.showCourseListByProf(userId);
      if( response && response !== undefined && response !== null) {
        setData(response);
        setIsLoading(false);
        getStudents(response);
        getInstruments(response);
        getComposers(response);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    }
     if(data.length < 1 && countRender <= 2  && userId !== null){
      setCountRender((prevCount) => prevCount + 1);
      getData(); 
     }
  },[data,isLoading,courseAPI,userId, countRender , getStudents , getComposers ,getInstruments]);


  const changeData = () => {
    let index = Object.values(currentData).map((value, index) => {

      return (
        <CardStudentsTracking
          key={index}
          id={value.id}
          imgSrc={value.photo !== '' ? value.photo :"https://i1.sndcdn.com/artworks-000236202373-bjmc48-t500x500.jpg"}
          imgAlt="cours"
          title={value.title}
          rating={value.ratingScore}
          compositor={value.composers[0].fullName}
          nmbrStudents={Object.values(value.users).length > 0 ?  Object.values(value.users).length  : '0'}
          instrument={value.instrument.name}
          shortDescription={value.preview}
          longDescription={value.description}
          linkTo={`/courses/${value.id}`}
        />
      );
    });

    return index;
  };



  return (
    <ContainerSidebarAndContent>
      <Sidebar>
        <InputSelect
          label={("Élèves").toUpperCase()}
          options={optionsStudents}
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        />

        <InputSelect
          label={("Instruments").toUpperCase()}
          options={optionsInstruments}
          value={selectedInstrument}
          onChange={(e) => setSelectedInstrument(e.target.value)}
        />

        <InputSelect
          label={("Compositeurs").toUpperCase()}
          options={optionsCompositors}
          value={selectedCompositor}
          onChange={(e) => setSelectedCompositor(e.target.value)}
        />


        <InputSearch value={searchValue} placeholder="Rechercher"  onChange={(e) => setSearchValue(e.target.value)} />

          {data.length > 0 && (
              <div className="display-short-infos-courses">
                <div className='short-courses-infos'>
                    <div className="label-courses">
                        <p>Cours :</p>
                        <p>Élèves :</p>
                        <p>Instruments :</p>
                        <p>Compositeurs :</p>
                    </div>
                    <div className="infos-courses">
                        <p>{data.length > 0 ? data.length : '0'} </p>
                        <p>{optionsStudents.length > 0 ? optionsStudents.length -1 : '0'} </p>
                        <p>{optionsInstruments.length > 0 ? optionsInstruments.length - 1  : '0'} </p>
                        <p>{optionsCompositors.length > 0 ? optionsCompositors.length - 1  : '0'} </p>
                    </div>
                </div>
              </div>
          )}
      </Sidebar>

      <ContainerContent>
      { isLoading ?
        (
        <>
          <LoadingElements />
        </>
        ) : (
          <>
          <section className="list-courses-for-professors">
            { data.length > 0 ? (
              <>
              {changeData()}
              </>
     
            ) : (
              <p>
                Nous n'avons aucun élément à afficher
              </p>
            )}  
          </section>



              <div className="zone-pagination" >
              { data.length > itemsPerPage  && (
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

ListStudentsTracking.propTypes = {};

ListStudentsTracking.defaultProps = {};

export default ListStudentsTracking;




