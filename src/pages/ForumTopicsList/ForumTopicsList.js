import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./ForumTopicsList.scss";
import {
  ContainerContent,
  ContainerSidebarAndContent,
  Sidebar,
} from "../../components";
import {
  Button,
  InputSearch,
  InputSelect,
  InputText,
} from "../../common/Index";
import TopicCard from "../../components/TopicCard/TopicCard";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Link } from "react-router-dom";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { getformatDate } from "../../utils/Date";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const ForumTopicsList = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryAsk, setSelectedCategoryAsk] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [canWeShowForm, setCanWeShowForm] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [successCreatTopic, setSuccessCreatTopic] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const { userId } = useContext(AuthContext);
  const { forumAPI } = useAPIContext();
  const [isLoading, setIsLoading] = useState(true);
  const [optionsCategory, setOptionsCategory] = useState([{ value: "", label: "catégories" }]);
  const [optionsCategoryAsk, setOptionsCategoryAsk] = useState([{ value: "", label: "catégories" }]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  // tronque le tableau sur la partie désirée
  const currentData = allTopics ? allTopics.slice(startIndex, endIndex) : '';
  const totalPages = allTopics ? Math.ceil(Object.values(allTopics).length / itemsPerPage) : '';
  const dataFetchedRef = useRef(false);

  const handleCancel = () => {
    setSuccessCreatTopic(null);
    setCanWeShowForm(!canWeShowForm);
    setTopicDescription("");
    setSuccessCreatTopic("");
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmitNewTopic = async (e) => {
    e.preventDefault();
    let topicsData = {
      subject: topicTitle,
      description: topicDescription,
      author: {
        id: userId,
      },
      category: {
        name: parseInt(selectedCategoryAsk),
      },
    };

    try {
      setAllTopics([]);
      await forumAPI.addForum(topicsData);
      setSuccessCreatTopic(true);
      setCanWeShowForm(false);
      setTopicDescription("");
      setSuccessCreatTopic("");
      displayData();
      setTimeout(() => {
        setSuccessCreatTopic(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };


  const getCategory = useCallback( (response) => {
    let tabCategory = [];

    const category = response.map((e) => {
      tabCategory.push(e.name);
      let objtValue = {};
      let coco = tabCategory.filter(x => x === e.name).length;

      if( coco === 1 ){
        objtValue = {
          value: e.id,
          label: e.name
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

  /** Récupère toutes les catégories pour le formulaire */
  const getAllCategory = useCallback(async () => {
    try {
      const responseCategory = await forumAPI.showCategory();
      const transformedData = responseCategory.map((category) => ({
        value: category.id,
        label: category.name
      }));
      const finalData = [
        ...optionsCategory,
        ...transformedData
      ];
      setOptionsCategoryAsk(finalData);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  },[forumAPI ,optionsCategory]);


  const getDatasByCategoryID = useCallback(async (value) => {
    try {
      setAllTopics([]);
      const responseCategory = await forumAPI.showAllByCategoryID( value );
      if( responseCategory.length > 0 ) {
        setAllTopics(responseCategory);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  },[forumAPI]);


  const getDatasBySubject = useCallback(async (value) => {
    try {
      setAllTopics([]);
      const responseCategory = await forumAPI.showAllBySubject( value );
      if( responseCategory.length > 0 ) {
        setAllTopics(responseCategory);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  },[forumAPI]);


  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    if( value && value !== '') {
      getDatasByCategoryID(value);
    }
  }

  const handleSearchInSubject = (value) => {
    setSearchValue(value);
    if( value && value !== '') {
      getDatasBySubject(value);
    }
  }


  const displayData = useCallback(async () => {
    setIsLoading(true);
    try {
      setAllTopics([]);
      const response = await forumAPI.showAll();
      if( response.length > 0 ) {
        let allCategories = Object.values(response).map((e) => e['category'][0]) ;
        setAllTopics(response);
        if( optionsCategory.length === 1 ){
          getCategory(allCategories);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [forumAPI,getCategory,optionsCategory]);

  useEffect(() => {

    if ( allTopics.length === 0 && !dataFetchedRef.current){
      dataFetchedRef.current = true;
      displayData();
      getAllCategory();
    }

    if( selectedCategory === '' && selectedCategory === '' && dataFetchedRef.current === true){
      setAllTopics([]);
      dataFetchedRef.current = false;
    }

  }, [displayData,getAllCategory, optionsCategory, allTopics.length ,selectedCategory ]);


  const creatForumQuestion = () => {
    return (
      <div className="topic-container-form">
        <form className="form-topic" onSubmit={handleSubmitNewTopic}>
          <h4> Poser une question </h4>
          <div className="mb-3">
            <InputText
              label="Titre:"
              placeholder="Titre"
              className="form-control"
              id="topicTitle"
              isRequired={true}
              onChange={(e) => setTopicTitle(e.target.value)}
              value={topicTitle}
            ></InputText>
          </div>
          <div className="mb-3">
            <InputSelect
              options={optionsCategoryAsk}
              value={selectedCategoryAsk}
              onChange={(e) => setSelectedCategoryAsk(e.target.value)}
            />
            <label htmlFor="topicDescription" className="form-label">
              {" "}
              Saisissez votre question:{" "}
            </label>
            <textarea
              name="story"
              placeholder="Saisissez votre question..."
              className="form-control"
              id="topicDescription"
              rows="5"
              cols="33"
              required
              onChange={(e) => setTopicDescription(e.target.value)}
              value={topicDescription}
            ></textarea>
          </div>

          <div className="topic-form-btn">
            <Button kind="secondary" onClick={handleCancel}>
              Retour
            </Button>
            <Button kind="primary">Envoyer</Button>
          </div>
        </form>
        {successCreatTopic !== null && successCreatTopic === false && (
          <p>
            {" "}
            L'ajout de votre commentaire a échoué <br /> Veuillez recommencer.
          </p>
        )}
      </div>
    );
  }


  const showListForumQuestion = () => {
    return (
      <>
        <div className="topic-list">
          {currentData ? currentData.map((e, index) => (

              <Link to={`${e.id}`} className="topic-list-link" key={index}>
                <TopicCard
                  zone="forum"
                  username={
                    e.author !== null &&
                      e.author !== undefined &&
                      Object.values(e.author)
                      ? e.author.firstName + " " + e.author.lastName
                      : ""
                  }
                  date={getformatDate(e.createdAt)}
                  title={e.subject}
                  photo={e.author.photo}
                  content={e.description}
                  category={e.category[0].name}
                  canShowDelete={false}
                  nmbComments={e.answersCount}
                  likes={e.likesCount ? e.likesCount : 0}
                  dislikes={e.dislikesCount ? e.dislikesCount : 0}
                />
              </Link>
          )) :
            <h3>No forums were found !</h3>
          }
          {currentData && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        </div>

      </>
    );
  }


  return (
    <ContainerSidebarAndContent>

      { canWeShowForm === false  && (
          <Sidebar>
              <InputSelect
                label={optionsCategory[0].label.toUpperCase()}
                options={optionsCategory}
                value={selectedCategory}
                onChange={(e) => handleSelectCategory(e.target.value)}
              />
              <InputSearch
                value={searchValue}
                placeholder="Rechercher"
                onChange={(e) => handleSearchInSubject(e.target.value)}
                onClick={handleSearchInSubject}
              />
              {userId && userId !== null && userId !== undefined && (
                <div>
                    <Button kind="primary" onClick={() => setCanWeShowForm(true)}>
                      Ajouter un commentaire
                    </Button>
                </div>
              )}
          </Sidebar>
      )}

      <ContainerContent>
        { isLoading ? (
            <>
                <LoadingElements />
            </>
        ) : (
          <>
            {canWeShowForm === true ? creatForumQuestion() : showListForumQuestion()}
          </> 
        )}
      </ContainerContent>
    </ContainerSidebarAndContent>
  );
};

ForumTopicsList.propTypes = {};

ForumTopicsList.defaultProps = {};

export default ForumTopicsList;
