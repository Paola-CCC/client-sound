import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Button from "../../common/Button/Button";
import "./CourseById.scss";
import classNames from "classnames";
import PlayerYoutube from "../../components/PlayerYoutube/PlayerYoutube";
import { useParams, useNavigate } from "react-router-dom";
import TopicCard from "../../components/TopicCard/TopicCard";
import CardPersoCourseById from "../../components/CardPersoCourseById/CardPersoCourseById";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { getformatDate } from "../../utils/Date";
import { useAPIContext } from "../../contexts/APIContextProvider";

const CourseById = () => {

  const { courseId } = useParams();
  const { userId, userRole } = useContext(AuthContext);
  const userInt = Number(userId);
  const { commentAPI, userProgressionAPI, courseAPI } = useAPIContext();
  const [displayedBlock, setDisplayedBlock] = useState("showDescription");
  const [canShowMore, setCanShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courseDatas, setCourseDatas] = useState([]);
  const [courseComments, setcourseComments] = useState("");
  const [courseCommentsTitle, setcourseCommentsTitle] = useState("");
  const [showBtnAddComments, setShowBtnAddComments] = useState(false);
  const [isCommentsSendIsOK, setIsCommentsSendIsOK] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [callAPIAppend, setCallAPIAppend] = useState(false);
  const [count, setCount] = useState(0);
  const [timeVideoLastVisit, setTimeVideoLastVisit] = useState('0:00');
  const [videoPreview, setVideoPreview] = useState('');
  const [videoLinkID, setVideoLinkID] = useState('');
  const [globalDurationTime, setGlobalDurationTime] = useState('');
  const [courseVideoIsFinished, setCourseVideoIsFinished] = useState(null);
  const navigate = useNavigate();

  const handleClickMessage = (professorId) => navigate(`${professorId}`);
  const dataFetchedRef = useRef(false);

  const [videoInformations, setVideoInformations] = useState({
    percentage: 0,
    duration: '',
    currentTime: '0:00'
  });

  const [status, setStatus] = useState({
    courseStatus: '',
    quizzStatus: ''
  });

  /** Pour Supprimer un commentaire */
  const handleDeleteComment = async (courseId, commentId) => {
    try {
      await commentAPI.deleteComment(courseId, userInt, commentId);
      if (!(userRole.includes("ROLE_PROFESSOR"))) {
        displayDataForStudent();
      }
    } catch (error) {
      console.error(error);
    }
  }

  /** Ajouter un commentaire */
  const handleShowBtnAddComments = () => {
    setShowBtnAddComments(!showBtnAddComments);
    if (courseComments) {
      setcourseComments("");
      setcourseCommentsTitle("");
    }
  };

  //   

  const handleDownload = (id, originalFilename) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${process.env.REACT_APP_API_URL}/course/${courseId}/fileupload/${id}`;
    downloadLink.setAttribute('download', originalFilename);
    downloadLink.click();

  };

  const sendComments = async () => {
    setIsLoading(true);
    let data = {
      title: courseCommentsTitle,
      content: courseComments
    };

    try {
      const response = await commentAPI.addComment(courseId, userId, data);
      if (response.data) {
        setIsCommentsSendIsOK(true);
        if (!(userRole.includes("ROLE_PROFESSOR"))) {
          displayDataForStudent();
        }
        setShowBtnAddComments(false);
        setcourseComments("");
        setcourseCommentsTitle("");
        setTimeout(() => {
          setIsCommentsSendIsOK(null);
        }, 5000);
      } else {
        setIsCommentsSendIsOK(false);
      }

    } catch (error) {
      console.error(error);
      setIsCommentsSendIsOK(false);
    }
  };

  const handleSendComments = () => {
    if (courseComments && courseComments !== '') {
      sendComments();
    }
  }

  const updateStudentProgressionFinish = async (value) => {

    const userDatas = {
      userOneId: userId,
      courseId: parseInt(courseId),
      percentageWatched: value.percentage,
      videoTimer: value.currentTime
    };

    await userProgressionAPI.updateOneProgression(userDatas);
  };

  const showCourseDocuments = useCallback(async () => {
    const parsedCourseId = parseInt(courseId);

    try {
      const response = await courseAPI.showCourseFiles(parsedCourseId);
      setAllFiles(response.data);

    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  })

  const displayDataForStudent = useCallback(async () => {

    const userDatas = {
      userOneId: userId,
      courseId: parseInt(courseId),
      percentageWatched: videoInformations.percentage,
      videoTimer: videoInformations.currentTime
    };

    try {
      const response = await userProgressionAPI.addProgression(userDatas);
      const data = response.map((e) => e.course);
      const element = response.map((e) => e.videoTimestamp);
      setCallAPIAppend(true);
      setCount((count) => count + 1);
      data.map((e) => setAllComments(e.comments));
      setCourseDatas(data);
      setVideoPreview(data[0].preview);
      if (element[0] && element[0] !== undefined && element[0] !== null) {
        setTimeVideoLastVisit(element[0]);
      }

      let elementsStatus = response.map((e) => ({
        courseStatus: e.courseStatus,
        quizzStatus: e.quizzStatus
      }));
      setStatus(elementsStatus);
      // setVideoLinkID(data[0].linkVideo);
      setVideoLinkID("8UImUUUUBVA");
    } catch (error) {
      setIsLoading(false);
    }
  }, [courseId, userId, userProgressionAPI, videoInformations]);

  const handleShowMore = () => {
    setCanShowMore(!canShowMore);
  };

  const ShowPersoCourses = () => {
    let globalData = Object.values(courseDatas).map((value, index) => {
      let professor = `${value.professor.firstName} ${value.professor.lastName}`;
      return (
        <CardPersoCourseById
          key={index}
          handleShowMore={handleShowMore}
          professorName={professor}
          photo={value.photo}
          canShowMore={canShowMore}
          biographyUserProf={value.professor.biography}
          handleOpenConversation={() => handleClickMessage(value.professor.id)}
        />
      );
    });
    return globalData;
  };


  const displayComments = () => {
    return (
      <>
        <div className="show-comments">
          {allComments.length > 0 ?
            Object.values(allComments).map((value, index) => {
              let username = `${value.user.firstName} ${value.user.lastName}`;
              return (
                <TopicCard
                  key={index}
                  zone="comments"
                  username={username}
                  date={getformatDate(value.createdAt)}
                  title={value.title}
                  photo={value.user.photo}
                  content={value.content}
                  canShowDelete={(value.user !== null && value.user !== undefined && Object.values(value.user)) && userId !== value.user.id ? false : true}
                  handleDeleteBtn={() => handleDeleteComment(courseDatas[0].id, value.id)}
                />
              );
            }) : (
              <p>
                Aucun commentaire à vous afficher
              </p>
            )}
        </div>
        <div className="zone-btn-add-comments">
          {showBtnAddComments === true && (
            <div className="mb-3">
              <label htmlFor="coursComments" className="form-label">
                {" "}
                Écrivez votre commentaire:{" "}
              </label>
              <textarea
                name="story"
                placeholder="Saisissez votre commentaire..."
                className="form-control"
                id="coursComments"
                rows="5"
                cols="33"
                required
                onChange={(e) => setcourseComments(e.target.value)}
                value={courseComments}
              ></textarea>
            </div>
          )}


          <div className={`feedback-comments ${isCommentsSendIsOK && isCommentsSendIsOK !== null ? 'success' : isCommentsSendIsOK === false && isCommentsSendIsOK !== null ? 'error' : null}`} >

            {isCommentsSendIsOK && isCommentsSendIsOK !== null ? (
              <p>
                Nous vous remercions d'avoir ajouté un commentaire, il a bien été envoyé.
              </p>
            ) : isCommentsSendIsOK === false && isCommentsSendIsOK !== null ? (
              <p>
                Veuillez nous excuser, un problème est survenu et votre commentaire n'a pas pu être enregistré. Merci de revenir ultérieurement.
              </p>
            ) : null}

          </div>


          <div className="btn-comments">
            {showBtnAddComments === false ? (
              <Button kind="primary" onClick={handleShowBtnAddComments}>
                Ajouter un commentaire
              </Button>
            ) : (
              <div className="grp-validation-comments">
                <Button kind="secondary" onClick={handleShowBtnAddComments}>
                  Annuler
                </Button>
                <Button kind="primary" onClick={handleSendComments} disabled={courseComments === "" ? true : false} >
                  Valider
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  const dislayDocuments = () => {
    return (
      <div className="show-documents">
        <ul>
          {allFiles ? (
            Object.values(allFiles).map((file, index) => (
              <li key={index}>
                <span className='file-title'>{file.originalFilename}</span>
                <button className="button-secondary" onClick={() => { handleDownload(file.id, file.originalFilename) }}>Télécharger</button>
              </li>
            ))
          ) : (
            <p>Aucun document à afficher.</p>
          )}
        </ul>
      </div>
    );
  }

  const displayDescription = () => {
    return (
      <div className="show-description">
        {Object.values(courseDatas).map((valueText, index) => {
          if (valueText.description) {
            return <p key={index}>{valueText.description}</p>;
          } else {
            return <p key={index}>Aucune description à vous afficher</p>;
          }
        })}
      </div>
    );
  }


  useEffect(() => {
    if (Object.values(courseDatas).length === 0 && userId !== null) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      displayDataForStudent()
      showCourseDocuments()
    }
  }, [courseId, timeVideoLastVisit, courseDatas, displayDataForStudent, courseVideoIsFinished, globalDurationTime, userId, videoInformations, userRole, callAPIAppend, count, userProgressionAPI]);

  return (
    <>
      <div className="zone-video">
        <div className="video-zone">

          {videoLinkID !== '' && (
            <PlayerYoutube
              videoId={videoLinkID}
              timefromLastVisit={timeVideoLastVisit}
              handleCourseVideoIsFinished={(e) => setCourseVideoIsFinished(e)}
              handleGlobalDurationTime={(e) => setGlobalDurationTime(e)}
              handleVideoInformations={(e) => setVideoInformations(e)}
              handleUpdateStudentProgressionFinish={(e) => updateStudentProgressionFinish(e)}
              preview={videoPreview}
              allStatus={status[0]}
              courseID={courseId}
            />
          )}
        </div>
      </div>

      <div className="courseId-component">
        {ShowPersoCourses()}
        <div className="common-style container-actions">
          <div className="btns-actions-area">
            <div className={classNames("button-element", { active: displayedBlock === "showDescription" })} onClick={() => setDisplayedBlock("showDescription")} >
              <span> Description</span>
            </div>

            <div className={classNames("button-element", { active: displayedBlock === "showDocuments" })} onClick={() => setDisplayedBlock("showDocuments")} >
              <span> Documents </span>
            </div>

            <div className={classNames("button-element", { active: displayedBlock === "showComments" })} onClick={() => setDisplayedBlock("showComments")} >
              {allComments.length > 1 ? (
                <span>
                  Commentaires <small> ({allComments.length})</small>
                </span>
              ) : (
                <span>
                  Commentaire <small> ({allComments.length})</small>
                </span>
              )}
            </div>
          </div>

          <div className="blocks-area">
            <div className="block-child">

              {displayedBlock === "showComments" && (displayComments())}
              {displayedBlock === "showDocuments" && (dislayDocuments())}
              {displayedBlock === "showDescription" && (displayDescription())}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseById;
