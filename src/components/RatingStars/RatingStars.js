import React, { useState } from "react";
import "./RatingStars.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RatingStars = ({ ratingScore, type }) => {

  const tabChoice = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState(0);

  return (
    <div>
        { type === 'change'  && (
          tabChoice.map((value) => (
            <span key={value}
                  onClick={() => setRating(value)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    size="sm"
                    style={{ color: value <= rating ? "#FDEB6A" : "#9999A3" }}
                  />
            </span>
          ))
       )}

       { type === 'show' && (
              tabChoice.map((value) => (
                <span key={value} >
                  <FontAwesomeIcon
                    icon={faStar}
                    size="sm"
                    style={{ color: value <= ratingScore ? "#FDEB6A" : "#9999A3" }}
                  />
                </span>
          ))
       )}
    </div>
  );
};

export default RatingStars;
