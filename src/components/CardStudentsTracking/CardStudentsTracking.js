import React from "react";
import "./CardStudentsTracking.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";

const CardStudentsTracking = ({
  imgSrc,
  imgAlt,
  rating,
  title,
  compositor,
  linkTo,
  nmbrStudents,
  instrument
}) => {
  return (
    <div className="__card-students-tracking">
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
        </Link>
        <div className="card-title-description">
          <span>{title}</span>
        </div>
        <div className="compositor">
          <span> {compositor}</span>
          <span className="instru"> {instrument}</span>
        </div>
        <hr/>

        <div className="cours-infos-little">
          <span className="nmbr-students">{nmbrStudents} Élèves</span>
          <span className="stars-area">
            <RatingStars ratingScore={rating} />
          </span>
        </div>
      </div>
    </div>
  );
};

CardStudentsTracking.propTypes = {};

CardStudentsTracking.defaultProps = {};

export default CardStudentsTracking;
