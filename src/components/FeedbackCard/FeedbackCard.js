import React from 'react';
import './FeedbackCard.scss';
import RatingStars from '../RatingStars/RatingStars';

const FeedbackCard = ({userName , city , scoreFeedback , srcPictureUser , altPicture , textContent}) => {

  return (
    <div className="feedback-card">
      <div className="users-infos-feedback">
        <div className="feedback-picture-users">
          <img
            src={srcPictureUser}
            alt={altPicture}
          />
        </div>
        <div>
          <div>
            <span>{userName}</span>
            <span>{city}</span>
          </div>
        </div>
        <div className="stars-feedback">
          <RatingStars ratingScore={scoreFeedback} />
        </div>
      </div>
      <div className="feedback-body">
        <p>
          {textContent}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;