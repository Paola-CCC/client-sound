import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopicCard from "../../components/TopicCard/TopicCard";
import "./ForumTopicById.scss";
import { AuthContext } from "../../contexts/AuthContextProvider";
import AnswerTopicById from "../../components/AnswerTopicById/AnswerTopicById";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { getformatDate } from "../../utils/Date";
import Pagination from "../../components/Pagination/Pagination";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const ForumTopicById = () => {
  const { userId } = useContext(AuthContext);
  const { forumId } = useParams();
  const { forumAPI, answerAPI, likeAPI } = useAPIContext();
  const userInt = parseInt(userId);
  const [courseTopicData, setTopicData] = useState({});
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [authorInfos, setAuthorInfos] = useState({});
  const [error, setError] = useState(null);
  const [canShowTextBlock, setCanShowTextBlock] = useState(false);
  const [valueTopicComment, setValueTopicComment] = useState("");
  const [allResponses, setAllResponses] = useState([]);
  const [answersCount, setAnswersCount] = useState(null);
  const [likesCount, setLikesCount] = useState();
  const [dislikesCount, setDislikesCount] = useState();
  const [liked, setLiked] = useState({
    like: false,
    dislike: false
  })

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  //calcule l'index de départ dans le tableau data pour la page actuelle.
  const startIndex = (currentPage - 1) * itemsPerPage;
  //Cette ligne calcule l'index de fin dans le tableau data pour la page actuelle
  const endIndex = startIndex + itemsPerPage;
  // tronque le tableau sur la partie désirée
  const currentData = allResponses && allResponses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allResponses && allResponses.length / itemsPerPage);
  const dataFetchedRef = useRef(false);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSendComment = async () => {
    let dataUser = {
      content: valueTopicComment,
      author: { id: userInt },
      forum: { id: forumId },
    };

    try {
      await answerAPI.addAnswerForum(forumId, dataUser);
      setError(null);
      setCanShowTextBlock(false);
      setValueTopicComment("");
      getAllComments();
    } catch (error) {
      console.error(error);
      setError(`Erreur lors de la requête API. ${error}`);
    }
  };

  const displayForumSubject = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await forumAPI.show(forumId);

      setTopicData(data);
      if (data.author.firstName && data.author.lastName) {
        setUsername(`${data.author.firstName} ${data.author.lastName}`);
        setAuthorInfos(data.author);
        setPhoto(data.author.photo);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(`Erreur lors de la requête API. ${error}`);
      setIsLoading(false);
    }
  }, [forumAPI, forumId]);

  const getAllComments = useCallback(async () => {
    try {
      const data = await answerAPI.showCommentsOfCourse(forumId);
      setAllResponses(data);
      setAnswersCount(data ? data.length : 0);
    } catch (error) {
      console.error(error);
      setError(`Erreur lors de la requête API. ${error}`);
    }
  }, [answerAPI, forumId]);

  const handleDeleteTopic = async (forumId) => {
    try {
      const data = await forumAPI.delete(forumId);
      if (data) {
        navigate("/forum");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTopicsResponses = async (responseId) => {
    try {
      await answerAPI.deleteResponse(responseId);
      getAllComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLike = async (options) => {
    if (userInt && options) {
      const data = {
        forumId,
        userInt,
        option: options
      }

      try {
        if (data.option === 1 && liked.dislike === false) {
          const resp = await likeAPI.addLike(data);

          setLikesCount(resp.nbLikes);
          setLiked({
            ...liked,
            like: resp.likedByUser
          });

        } else if (data.option === -1 && liked.like === false) {

          const resp = await likeAPI.addDislike(data);

          setDislikesCount(resp.nbDislikes);
          setLiked({
            ...liked,
            dislike: resp.dislikedByUser
          });

        } else {
          console.log('oops only one option is possible')
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getLikedByUser = useCallback(async (userId, forumId) => {
    if (userId) {
      const data = {
        userId,
        forumId
      }
      const resp = await likeAPI.getLikedByUser(data);

      if (resp) {
        setLiked({
          like: resp.likedByUser,
          dislike: resp.dislikedByUser
        })
      }
    }
  },[likeAPI])

  useEffect(() => {

    if ( allResponses.length === 0 && !dataFetchedRef.current  ) {
      dataFetchedRef.current = true;
      displayForumSubject();
      getAllComments();
    } else {
      if ( Object.values(courseTopicData).length > 0 ) {
        setLikesCount(courseTopicData.likesCount);
        setDislikesCount(courseTopicData.dislikesCount);
        getLikedByUser(userInt, forumId);
      }
    }
  }, [displayForumSubject, getAllComments, allResponses, courseTopicData, getLikedByUser, userInt, forumId]);


  const handleCancelBtn = () => {
    setCanShowTextBlock(!canShowTextBlock);
    setValueTopicComment("");
    setValueTopicComment("");
  };

  return (

    <>
      {isLoading ?
        (
          <div className="forum-topic-byId">
            <LoadingElements />
          </div>
        ) : (
          <>
            <div className="forum-topic-byId">
              <TopicCard
                key={courseTopicData.id}
                zone="topicById"
                username={username}
                photo={photo}
                date={getformatDate(courseTopicData.createdAt)}
                title={courseTopicData.subject}
                content={courseTopicData.description}
                canShowDelete={authorInfos.id === userId ? true : false}
                handleDeleteBtn={() => handleDeleteTopic(forumId)}
                handleCancelBtn={() => handleCancelBtn()}
                handleSendComment={() => handleSendComment()}
                handleReplyComment={() => setCanShowTextBlock(!canShowTextBlock)}
                changeTopicComment={(e) => setValueTopicComment(e.target.value)}
                valueTopicComment={valueTopicComment}
                canShowTextBlock={canShowTextBlock}
                category={courseTopicData.category[0].name}
                nmbComments={answersCount}
                likes={likesCount}
                dislikes={dislikesCount}
                liked={liked}
                handleClickLike={(e) => handleClickLike(e)}
              />
              <div className={`group-answer ${answersCount > 0 ? 'active' : ''}`}>
                {currentData.map((e, index) => {
                  return (
                    <AnswerTopicById
                      key={index}
                      username={`${e.author.firstName} ${e.author.lastName}`}
                      photo={e.author.photo}
                      date={getformatDate(e.createdAt)}
                      title={""}
                      content={e.content}
                      canShowDelete={e.author.id === userId ? true : false}
                      handleDeleteBtn={() => handleDeleteTopicsResponses(e.id)}
                    />
                  );
                })}
              </div>

              <div className="zone-pagination" >
                {allResponses.length > itemsPerPage && (
                  <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                )}
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default ForumTopicById;
