import React from 'react';
import './CardLearningTracking.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import RatingStars from '../RatingStars/RatingStars';

const CardLearningTracking = ({ valueProgress, imgSrc, imgAlt, professorName,rating, title, shortDescription,linkTo }) => {
  return (
  <div className="cardLearningTracking">
      <div className="card-img">
        {imgSrc && imgAlt && (
          <img src={imgSrc} alt={imgAlt} className="card-img" />
        )}
      </div>
      <div className="card-body">
        <Link to={linkTo}>
          <span className="card-player-svg">
            <FontAwesomeIcon
              icon={faPlay}
              size="xl"
              style={{ color: "#000000" }}
            />
          </span>
        </ Link> 
        <div className="card-title-description">
          <span>{title}</span>
          <span>{shortDescription}</span>
        </div>
        <div className='progressbar'>
          <progress value={valueProgress} max="100" style={{width: '85%', height: '12px'}}></progress>
          <small>{valueProgress}%</small>
        </div>
        <hr />
        <div className="cours-infos-little">
          <small>de {professorName}</small>
          <span className="stars-area">
            <RatingStars ratingScore={rating} />
          </span>
        </div>
      </div>
  </div>
)};

CardLearningTracking.propTypes = {};

CardLearningTracking.defaultProps = {};

export default CardLearningTracking;
