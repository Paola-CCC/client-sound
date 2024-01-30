import React, { useEffect } from "react";
import "./DisplayFeedbackCard.scss";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const DisplayFeedbackCard = () => {

  const [data, setData] = React.useState([]);

  const baseURL = "https://api-sound-project.com";

  useEffect(() => {
    axios.get(baseURL + '/review' ).then((response) => {
      setData(response.data);
    });
  }, []);

   
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <di className="container-carrousel">
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
    </di>
  );
};


export default DisplayFeedbackCard;
