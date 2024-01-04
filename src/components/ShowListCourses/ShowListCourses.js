import React, { useEffect, useState } from 'react';
import './ShowListCourses.scss';
import axios from "axios";
import { Card } from '../../common/Index';


const ShowListCourses = () => {

  // const [isLoading , setIsLoading ] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      return await axios.get(`http://localhost:1234/courses`)
       .then((response) => {
         setData(response.data);//update state
       })
       .catch((error) => {
         console.log(error);
       });
     }
     if( Object.values(data).length === 0){
      getData(); 
     }
  },[data]);

  const changeData = () => {
    let index = Object.values(data).map((value, index) => {
    let professor = `${value.professor.firstName} ${value.professor.lastName}`  ;

      return (
          <Card
          key={index}
          id={value.id}
          imgSrc={value.photo !== '' ? value.photo :"https://i1.sndcdn.com/artworks-000236202373-bjmc48-t500x500.jpg"}
          imgAlt="Cours de Violon"
          title={value.title}
          rating={value.ratingScore}
          shortDescription={value.preview}
          longDescription={value.description}
          professorName={professor}
          linkTo={`/${value.id}`}
          />
        );
    });

    return index;
  };


  return (
    <div className="list-courses">
      {changeData()}
    </div>
  );
  
}





export default ShowListCourses;
