import React, { useEffect } from "react";
import "./DisplayFeedbackCard.scss";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const DisplayFeedbackCard = () => {

  const [data, setData] = React.useState([]);

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(baseURL + '/review' ).then((response) => {
      setData(response.data);
    });
  }, []);

   
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1388,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="container-carrousel">
      <Slider {...settings}>
         { data?.map((e,i)=> (
            <div key={i}>
              <FeedbackCard 
                userName={e.author.firstName + ' ' + e.author.lastName }
                srcPictureUser={e.author.photo}
                textContent={e.contentText}
                date={e.createdAt}
                />
            </div>
          ))
        }
      </Slider>
    </div>
  );
};


export default DisplayFeedbackCard;
