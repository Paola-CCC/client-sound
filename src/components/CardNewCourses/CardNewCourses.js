import React from 'react';
import { useNavigate } from "react-router-dom";
const CardNewCourses = ({ pictureNewCourses, altNew, titleNew, contentNew , courseId}) => {

  const navigate = useNavigate();
   const handleClick = () => (navigate(`/courses/${courseId}`)) ;
  

  return (
    <figure className="img-news"  tabIndex={0}  onClick={ handleClick}>
      <img src={pictureNewCourses} alt={altNew} />
      <figcaption>
        <h6>{titleNew}</h6>
        <p>{contentNew}</p>
      </figcaption>
    </figure>
  );
};

CardNewCourses.propTypes = {};

CardNewCourses.defaultProps = {};

export default CardNewCourses;
