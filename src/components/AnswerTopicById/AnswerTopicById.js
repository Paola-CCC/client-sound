import React from 'react';
import './AnswerTopicById.scss';
import { Button } from "../../common/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { faTrash} from "@fortawesome/free-solid-svg-icons";

const AnswerTopicById = ({  
  username,
  date,
  title,
  handleDeleteBtn,
  canShowDelete,
  content,
  photo = ''
}) => (
  <div className="answer-card-body">
    <div className="media-body">
      <div className="answer-image">
        <img
          src={photo}
          alt="Impage Description"
        />
      </div>
      <div className="answer-user-infos">
        <h6> 
          {title}
        </h6> 
        <span className="answer-username"> {username}  <small> le {date} </small> 
        </span>
      </div>
    </div>
    <hr></hr>
    <div className="answer-content">
      <p>{content}</p>
    </div>
    <div className="answer-icons">

        { canShowDelete && (
          <Button onClick={handleDeleteBtn}>
            <FontAwesomeIcon icon={faTrash} />
            <span className='text-delete'>Supprimer</span>
          </Button>
        )}
        {/* <Button >
          <FontAwesomeIcon icon={faThumbsUp}  size="lg"/>                    
        </Button>
        <Button >
          <FontAwesomeIcon icon={faThumbsUp} rotation={180} size="lg" />                    
        </Button> */}
    </div>
</div>
);


export default AnswerTopicById ;