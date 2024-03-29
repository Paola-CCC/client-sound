import './FeedbackCard.scss';

const FeedbackCard = ({userName ,date, srcPictureUser , altPicture , textContent}) => {

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
            <span>{date}</span>
          </div>
        </div>
        {/* <div className="stars-feedback">
          <RatingStars ratingScore={scoreFeedback} type={'show'}  />
        </div> */}
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