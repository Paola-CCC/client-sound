import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ForumTopicsList.scss";
import { ContainerSidebarAndContent } from "../../components";
import {
  Button,
  InputSearch,
  InputSelect,
  InputText,
} from "../../common/Index";
import TopicCard from "../../components/TopicCard/TopicCard";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import { Link } from "react-router-dom";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { getformatDate } from "../../utils/Date";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark , faMagnifyingGlass ,faPen} from "@fortawesome/free-solid-svg-icons";

const ForumTopicsList = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryAsk, setSelectedCategoryAsk] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [canWeShowForm, setCanWeShowForm] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [successCreatTopic, setSuccessCreatTopic] = useState(null);
  const { userId, isAuthenticated } = useAuthContext();
  const { forumAPI } = useAPIContext();
  const [isLoading, setIsLoading] = useState(true);
  const [optionsCategory, setOptionsCategory] = useState([{ value: "", label: "catégorie" }]);
  const [optionsCategoryAsk, setOptionsCategoryAsk] = useState([{ value: "", label: "catégorie" }]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  // tronque le tableau sur la partie désirée
  const [ currentData, setCurrentData] = useState([]);
  const [ totalPages, setTotalPages] = useState(1);
  const dataFetchedRef = useRef(false);
  const categoryListFetchedForumRef = useRef(false);

  const handleCancel = () => {
    setSuccessCreatTopic(null);
    setCanWeShowForm(false);
    setTopicDescription("");
    setSuccessCreatTopic("");
    setSelectedCategoryAsk("");
    setSelectedCategory('');
    setTopicTitle("");
    setSearchValue('');
    window.location.reload(true);
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
      setCurrentData([]);
      await forumAPI.addForum(topicsData);
      setSuccessCreatTopic(true);
      setCanWeShowForm(false);
      setTopicDescription("");
      setSuccessCreatTopic("");
      displayData();
      setSelectedCategoryAsk("");
      setTopicTitle("");
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
 const getAllCategory = useCallback( async () => {
  try {
    const responseCategory = await forumAPI.showCategory();

    const transformedData = responseCategory.map((category) => ({
      value: category.id,
      label: category.name
    }));

    const finalData = [
      ...optionsCategoryAsk,
      ...transformedData
    ];
    setOptionsCategoryAsk(finalData);
    setOptionsCategory(finalData);


  } catch (error) {
    console.error("Error fetching category data:", error);
  }
},[forumAPI, optionsCategoryAsk]);

  const getForumAfterSearch = async () => {
    const objValue = {
        categoryId: selectedCategory !== "" ? parseInt(selectedCategory) : "" ,
        subjectName: searchValue
    }

    try {
      const sortedData = await forumAPI.showForumSorted(objValue);
      if( sortedData.length > 0 ) {
        setCurrentData(sortedData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };


  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
  }

  const handleSearchInSubject = (value) => {
    setSearchValue(value);
  }


  const displayData = useCallback(async () => {
    setIsLoading(true);
    try {
      setCurrentData([]);
      const response = await forumAPI.showAll();

      if( response.length > 0 ) {
        let allCategories = Object.values(response).map((e) => e['category'][0]) ;
        if( allCategories.length > 0 ){
          getCategory(allCategories);
        }
        const currentElemnt = response && response.slice(startIndex, endIndex);
        setCurrentData(currentElemnt);
        const totalElement = Math.ceil(response && response.length / itemsPerPage);
        setTotalPages(totalElement);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [forumAPI,getCategory, startIndex , endIndex]);

  useEffect(() => {

    if (  Object.values(currentData).length === 0 && !dataFetchedRef.current){
      displayData();
      dataFetchedRef.current = true;
    }

    if (!categoryListFetchedForumRef.current) {
      getAllCategory();
      categoryListFetchedForumRef.current = true ;
    }

  }, [displayData, optionsCategory, selectedCategory,currentData , getAllCategory ]);


  const creatForumQuestion = () => {
    return (
      <div className="topic-container-form">
        <form className="form-topic" >
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
            <Button kind="primary" onClick={handleSubmitNewTopic}>
              Envoyer
            </Button>
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
          {currentData.length > 0 ? currentData.map((e, index) => (
            
                <Link to={`${e?.id}`} className="topic-list-link" key={index}>
                <TopicCard
                  zone="forum"
                  username={
                    e?.author !== null &&
                      e?.author !== undefined &&
                      Object.values(e.author)
                      ? e?.author?.firstName + " " + e?.author?.lastName
                      : ""
                  }
                  date={getformatDate(e.createdAt)}
                  title={e?.subject}
                  photo={e?.author?.photo}
                  content={e?.description}
                  category={e?.category[0]?.name}
                  canShowDelete={false}
                  nmbComments={e?.answersCount}
                  likes={e?.likesCount ? e.likesCount : 0}
                  dislikes={e?.dislikesCount ? e?.dislikesCount : 0}
                />
              </Link>

            
          )) :
            <p> Il n'existe pas encore de sujets de Forum.</p>
          }
        { currentData.length > 0 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        </div>

      </>
    );
  }


  return (
    <ContainerSidebarAndContent>

      { canWeShowForm === false  && (
          <div className='form-sort form-topic-list'>
              <InputSelect
                label={optionsCategory[0].label.toUpperCase()}
                options={optionsCategory}
                value={selectedCategory}
                onChange={(e) => handleSelectCategory(e.target.value)}
              />
              <InputSearch
                value={searchValue}
                placeholder="Rechercher..."
                onChange={(e) => handleSearchInSubject(e.target.value)}
                onClick={handleSearchInSubject}
              />
                <div className="clear-all-sort">
                  <button onClick={handleCancel}> 
                      <FontAwesomeIcon icon={faCircleXmark} />
                      <small> Nettoyer</small>
                  </button>
                </div>
                <div className='clear-all-sort'>
                  <Button kind={"primary"} onClick={getForumAfterSearch}> 
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      Filter
                  </Button>
                </div>
                <div className='clear-all-sort'>
                  <Button kind={"secondary"} disabled={ isAuthenticated ? false : true} onClick={() => setCanWeShowForm(true)}> 
                    <FontAwesomeIcon icon={faPen} />
                    Commenter
                  </Button>
                </div>
                
          </div>
      )} 

      <div className='content-area'>
        { isLoading ? (
            <>
                <LoadingElements />
            </>
        ) : (
          <>
            {canWeShowForm === true ? creatForumQuestion() : showListForumQuestion()}
          </> 
        )}
      </div>
    </ContainerSidebarAndContent>
  );
};

export default ForumTopicsList;
