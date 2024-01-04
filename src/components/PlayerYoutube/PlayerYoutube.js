import React, { useState } from "react";
import YouTube from 'react-youtube';
import "./PlayerYoutube.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay ,faReply ,faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PlayerYoutube = ({
  videoId,
  timefromLastVisit,
  handleCourseVideoIsFinished,
  handleGlobalDurationTime,
  handleVideoInformations,
  preview,
  handleUpdateStudentProgressionFinish,
  allStatus,
  courseID
}) => {

  const [ canShowVideo, setCanShowVideo] = useState();
  const [ player, setPlayer] = useState(null);
  const [ timer, setTimer] = useState(timefromLastVisit);
  const [ isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const handleGoQuizz = () => navigate(`/courses/quizz/${courseID}`);

  const getTimer = () => {
    const positionInSeconds = convertTimeToTimestamp(timer);
    return positionInSeconds;
  }
  
  const elementStyle = {
    backgroundImage: `url(${preview})`,
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const formatTime = (time) => {
    time = Math.round(time);
    let minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ":" + seconds;
  };

  const formatTimeEnd = (time) => {
    time = Math.round(time);
    let minutes = Math.floor(time / 60),
    seconds = (time - minutes * 60) - 1;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ":" + seconds;
  };

  const convertTimeToTimestamp = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const onReady = (event) => {
    const player = event.target;
    setPlayer(event.target);
    const durationTime = formatTimeEnd(event.target.getDuration());
    handleGlobalDurationTime(durationTime);
    player.seekTo(getTimer());
    player.playVideo();
  };

  const handleStateChange = (event) => {

    const durationTime = formatTimeEnd(event.target.getDuration());
    const currentTime = formatTime(event.target.getCurrentTime());
    const percentageWatched = timeElements(event.target.getCurrentTime(), event.target.getDuration());
    handleVideoInformations({
      percentage: percentageWatched,
      duration: durationTime,
      currentTime: currentTime
    });
  };

  const onEnd = (event) => {

    const currentTime = formatTime(event.target.getCurrentTime());
    const durationTime = formatTimeEnd(event.target.getDuration());
    // Vérifier si la vidéo est terminée
    if (currentTime  >= durationTime) {
        handleCourseVideoIsFinished(true);
        const upDateFinish = {
          percentage: 100,
          duration: durationTime,
          currentTime: durationTime
        };
        handleUpdateStudentProgressionFinish(upDateFinish);
        setCanShowVideo(!canShowVideo);
        setIsFinished(true);
    }

  };

  // Calcule du pourcentage du temps vu
  const timeElements = (haveSeen , totalDuration) => {
    const percentage = (haveSeen / totalDuration) * 100 ;
    return Math.round(percentage);
  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };


  const onPauseHandler = () => {
    player.pauseVideo();
    const currentTime = formatTime(player.getCurrentTime());
    const durationTime = formatTimeEnd(player.getDuration());
    const percentageWatched = timeElements(player.getCurrentTime(), player.getDuration());
    const upDateData = {
      percentage: percentageWatched,
      duration: durationTime,
      currentTime: currentTime
    };
    handleUpdateStudentProgressionFinish(upDateData);
  };


  const handleReply = () => {
    setCanShowVideo(!canShowVideo);
    setTimer('0:00');
    setIsFinished(false);
  }

  const opts  = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 1,
      playlist: videoId,
    }
  };

  return (

    <>
        {  canShowVideo && canShowVideo !== false  ? (  

              <YouTube
                videoId={videoId}
                onReady={onReady}
                onEnd={onEnd}
                onError={onError}
                opts={opts}
                onStateChange={handleStateChange}
                onPause={onPauseHandler}

              /> 

          ) : (
              <div className="beforeVidéo">
                <div className="userIsKnow" style={elementStyle}></div>
                  <div className="_elementIcons">

                    { allStatus.courseStatus !== 'NOT_STARTED' && allStatus.courseStatus !== undefined ? 
                      (
                      <div className="_zoneIcons">
                        <button onClick={handleReply}> 
                          <FontAwesomeIcon icon={faReply} size="2xl"/>
                          <br/>
                          <span> Recommencer </span>
                        </button>
                      </div>          
                      ) : null
                    }
               
                    { allStatus.courseStatus !== 'FINISHED' && isFinished === false ? 
                      (
                      <div className="_zoneIcons">
                        <button onClick={()  => setCanShowVideo(!canShowVideo)}> 
                          <FontAwesomeIcon icon={faCirclePlay} size="2xl"/>
                          <br/>
                          <span> 
                            { allStatus.courseStatus === 'IN_PROGRESS' && allStatus.courseStatus !== undefined ? 'Continuer' : 'Commencer '}
                          </span>
                        </button>
                      </div>         
                      ) : null
                    }

                    { (allStatus.courseStatus === 'FINISHED' || isFinished ) &&
                      (
                      <div className="_zoneIcons">
                        <button onClick={handleGoQuizz}> 
                          <FontAwesomeIcon icon={faGraduationCap} size="2xl" />
                          <br/>
                          <span> Réaliser le Quizz </span>
                        </button>
                      </div>          
                      )
                    }
                  </div>
              </div>
          )
        }
    </>

  );
};


export default PlayerYoutube;
