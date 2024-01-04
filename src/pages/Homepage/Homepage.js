import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Homepage.scss";
import DisplayFeedbackCard from "../../components/DisplayFeedbackCard/DisplayFeedbackCard";
import HomeHero from "../../components/HomeHero/HomeHero";
import { Button, Card } from '../../common/Index';
import { useAPIContext } from "../../contexts/APIContextProvider";
import { DisplayNewCourses } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoadingElements from "../../components/LoadingElements/LoadingElements";
import { useAxiosFetchCourse } from "../../hooks/axiosFetch";
import { useInstrumentContext } from "../../contexts/InstrumentProvider";



const Homepage = () => {

  const navigate = useNavigate();
  const { instrumentSelected } = useInstrumentContext();
  const { fetchData } = useAxiosFetchCourse();
  const { courseAPI } = useAPIContext();
  const [isLoading , setIsLoading ] = useState(false);
  const [data, setData] = useState([]);
  const dataToShow = data ? data.slice(0, 12) : [];
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompositor, setSelectedCompositor] = useState("");
  const [searchValue , setSearchValue] = useState('');
  const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "professeurs" }]);
  const [optionsCategory, setOptionsCategory] = useState([{ value: "", label: "catégories" }]);
  const [optionsCompositors, setOptionsCompositor] = useState([{ value: "", label: "compositeurs" }]);
  const dataFetchedRef = useRef(false);


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


  const getCategory = useCallback( (response) => {
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

  const getComposers = useCallback( (response) => {
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

  const getFormFocus = () => {
    navigate(`/courses-all`) ;
  }

  const checkEmptyValue = (obj) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== '') {
        return true;
      }
    }
    return false;
  }

  const searchCoursesDatas = (event) => {
    event.preventDefault();

    let index = {
      instrumentName : instrumentSelected,
      professorId :selectedProfessor,
      categoryId : selectedCategory,
      composerId :selectedCompositor,
      title : searchValue
    };

    if (checkEmptyValue(index)) {
      fetchData(index).then((e) => {
        setData([]);
        setData(e);
        return;
      });
      return ;

    } else {
      fetchData(index).then((e) => {
        setData([]);
        setData(e);
        return;
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await courseAPI.showAll();
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    if(data && Object.values(data).length === 0 && !dataFetchedRef.current){
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
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

  },[data,isLoading,courseAPI,selectedProfessor,getProfessorForOption,optionsCategory,optionsCompositors ,optionsProfessors,getCategory,getComposers,selectedCategory,selectedCompositor,searchValue,fetchData]);


  return (
    <div className="global-homepage">
      <HomeHero 
      professorsList={optionsProfessors}
      selectedProfessor={selectedProfessor}
      handleSelectedProfessor={(e) => setSelectedProfessor(e.target.value)}

      categoryList={optionsCategory}
      selectedCategory={selectedCategory}
      handleSelectedCategory={(e) => setSelectedCategory(e.target.value)}

      compositorList={optionsCompositors}
      selectedCompositor={selectedCompositor}
      handleSelectedCompositor={(e) => setSelectedCompositor(e.target.value)}

      searchValue={searchValue}
      handleSearchValue={(e)=> setSearchValue(e.target.value)}

      handleFilter={searchCoursesDatas}

      />
      <div className="homepage-grid-area">

        {/* NOUVEAUTE */}

        <section className="new-courses">
          <div className="container-line">
            <span className="overlay">Nouveautés </span>
          </div>

          { isLoading ? (
            <>
                <LoadingElements />
            </>
          ) : (
              <DisplayNewCourses newCoursesData={data?.length > 0 ? data.slice(-4) : []}/>
          )}
        </section>

        {/* SHOW-LIST-COURSES */}

        <section className="container-courses">
          <div className="container-line">
            <span className="overlay">Actuellement sur Saline Academy </span>
          </div>

          <div className="list-courses">
              { isLoading  ?
                (
                <>
                    <LoadingElements />
                </>
                ) :       
                <>
                  <ul className='all-courses'>
                    {dataToShow?.map((value, index) => (
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
                  <div className='gestion-pages see-more'>
                      <Button kind="primary" onClick={getFormFocus}>
                          Voir plus 
                          <FontAwesomeIcon icon={faArrowRightLong} />
                      </Button> 
                  </div>
                </>
              }
          </div>
        </section>

        {/* MASTERCLASS */}

        <section className="masterclass">
          <div className="text-content-masterclass">
            <div className="text-area-masterclass">
              <h4>MASTERCLASS </h4>

              <h5>Accédez à toutes nos masterclass en ligne</h5>
            </div>
            <div className="text-area-masterclass">
            </div>
            <p>
            Saline royale academy dispose du plus complet et le plus prestigieux catalogue international de master class filmées de musique classique et baroque.
            </p>
            <p>
            Notre catalogue en ligne sur salineacademy.com présente aujourd’hui plus de 200 masterclass des plus prestigieux professeurs (Miriam Fried, Martin Beaver, Jacques Rouvier, Stephen Kovacevich, Augustin Dumay…) captées lors des académies au sein de la Saline royale d’Arc-et-Senans.
            </p>
          </div>

          <div className="photo-area-masterclass">
            <img
              src="https://www.salineroyale.com/wp-content/uploads/2021/12/257139216_425738255910626_3958402937689769937_n-1024x769.jpg"
              alt="Description "
            />
          </div>
        </section>

        {/* FEEDBACKS */}

        <section className="users-feedbacks">
          <div className="container-line">
            <span className="overlay">Ce que disent nos clients </span>
          </div>

          <div className="display-users-feedbacks">
            <DisplayFeedbackCard />
          </div>
        </section>
      </div>
    </div>
  );
};

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;