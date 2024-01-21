import React, {  useEffect, useRef, useState } from "react";
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



const Homepage = () => {

  const navigate = useNavigate();
  const { fetchData } = useAxiosFetchCourse();
  const { courseAPI } = useAPIContext();
  const [isLoading , setIsLoading ] = useState(false);
  const [data, setData] = useState([]);
  const dataToShow = data ? data.slice(0, 12) : [];

  const dataFetchedRef = useRef(false);

  const getFormFocus = () => {
    navigate(`/courses-all`) ;
  }

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



  },[data,isLoading,fetchData , courseAPI]);


  return (
    <div className="global-homepage">
      <HomeHero />
      <div className="homepage-grid-area">

        {/* NOUVEAUTE */}

        <section className="new-courses">
          <div className="container-line new-zone">
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