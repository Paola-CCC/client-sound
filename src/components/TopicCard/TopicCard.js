import React, { useContext } from "react";
import "./TopicCard.scss";
import {
  faMessage,
  faTrash,
  faCommentDots,
  faPaperPlane,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../common/Index";
import { AuthContext } from "../../contexts/AuthContextProvider";

const TopicCard = ({
  zone,
  username,
  date,
  title,
  content,
  canShowDelete,
  handleDeleteBtn,
  handleClickLike,
  handleCancelBtn,
  handleSendComment,
  handleReplyComment,
  changeTopicComment,
  valueTopicComment,
  canShowTextBlock,
  nmbComments,
  photo = '',
  likes,
  dislikes,
  liked,
  category
}) => {
  const { userId } = useContext(AuthContext);
  return (
    <>
      <div className="topic-card-body">
        <div className="media-body">
          <div className="topic-image">
            <img
              src={photo}
              alt="Impage Description"
            />
          </div>
          <div className="topic-user-infos">
            {zone === "comments" ? <h6> {title} </h6> : <h5> {title} </h5>}
            <span className="topic-username">
                {username}
                <small> le {date} </small>
             </span>
             {category && category !== ''  && (
                <span>
                  <span className="category">
                    {category}
                  </span>
                </span>

             )}
          </div>
        </div>

        <div className="topic-content">
          <p>{content}</p>
        </div>

        {zone === "comments" && canShowDelete ? (
          <div className="delete-btn-area">
            <Button onClick={handleDeleteBtn}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Supprimer</span>
            </Button>
          </div>
        ) : null}

        
        <div className="topic-icons">


        {(zone === "forum" || zone === "topicById")? (
          <>
            <Button onClick={() => handleClickLike(1)}>
              <FontAwesomeIcon icon={faThumbsUp}  size="lg" className={`${liked && liked.like === true ? 'btnInverse' : ''}`}/>    
              <span>{likes && likes}</span>
                
            </Button>
            <Button onClick={() => handleClickLike(-1)} >
              <FontAwesomeIcon icon={faThumbsUp} rotation={180} size="lg" className={`${liked && liked.dislike === true ? 'btnInverse' : ''}`}/>    
              <span>{dislikes && dislikes}</span>
            </Button> 
          </>
          ) : null}

          {(zone === "forum" || zone === "topicById") && canShowDelete ? (
            <Button onClick={handleDeleteBtn}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Supprimer</span>
            </Button>
          ) : null}

          <Button>
            <FontAwesomeIcon icon={faMessage} />
            {nmbComments === 1 || nmbComments === 0 ? (
              <span>{nmbComments} commentaire</span>
            ) : (
              <span>{nmbComments} commentaires</span>
            )}
          </Button>

          {zone === "topicById" && !canShowTextBlock && (userId && userId !== null && userId !== undefined) && (
            <Button kind="primary" onClick={handleReplyComment}>
              <FontAwesomeIcon icon={faCommentDots} />
              <span>Répondre</span>
            </Button>
          )}
        </div>
      </div>
      {/* Zone pour écrire un commentaire pour un Topic */}
      {zone === "topicById" && (
        <div className={`topic-text ${canShowTextBlock ? 'visible' : ''}` }  >
          <textarea
            name="story"
            placeholder="Saisissez votre commentaire..."
            className="form-control"
            id="coursComments"
            rows="3"
            cols="33"
            required
            onChange={changeTopicComment}
            value={valueTopicComment}
          ></textarea>

          <div className="group-btn-send">
            <div className="cancel-btn">
              <Button onClick={handleCancelBtn}>
                <span>Annuler</span>
              </Button>
            </div>

            <div className="send-btn">
              <Button kind="primary" onClick={handleSendComment} disabled={valueTopicComment && valueTopicComment !== '' ? false : true}>
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Envoyer</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicCard;
