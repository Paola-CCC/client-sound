import React from "react";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars/RatingStars";

const Card = ({ imgSrc, imgAlt, professorName, title, rating,linkTo }) => {


  return (
    <div className="card">
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
        <div className="card-title">
          <span >{title}</span>
        </div>

        <hr />
        <div className="cours-infos-little">
          <small>de {professorName}</small>
          <span className="stars-area">
            <RatingStars ratingScore={rating} type={'show'} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
