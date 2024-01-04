import React from 'react';
import CardNewCourses from '../CardNewCourses/CardNewCourses';
const DisplayNewCourses = ({newCoursesData}) => {

  return (
  <div className="zone-images">

      {newCoursesData.map((value, index) => (
          <CardNewCourses
            key={index}
            courseId={value.id}
            pictureNewCourses={value.photo}
            altNew={null}
            titleNew={(value.title).toUpperCase()}
            // contentNew={value.preview}
          />
      ))}
     
  </div>
);}




DisplayNewCourses.propTypes = {};

DisplayNewCourses.defaultProps = {};

export default DisplayNewCourses;
