import React, { useEffect } from "react";
import "./DisplayFeedbackCard.scss";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import axios from "axios";

const DisplayFeedbackCard = () => {

  const [data, setData] = React.useState([]);

  const baseURL = "https://api-sound-project.com";

  useEffect(() => {
    axios.get(baseURL + '/review' ).then((response) => {
      setData(response.data);
      console.log("data " ,response.data  )
    });
  }, []);

  return (
    <>
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
    </>
  );
};

DisplayFeedbackCard.propTypes = {};

DisplayFeedbackCard.defaultProps = {};

export default DisplayFeedbackCard;
