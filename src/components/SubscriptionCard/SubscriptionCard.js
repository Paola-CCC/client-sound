import React, { useState } from "react";
import './SubscriptionCard.scss';
import { Button } from "../../common/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const SubscriptionCard = ({ subscription, onSelectSubscription, isUserSub }) => {
  
  const [isSelected, setIsSelected] = useState(isUserSub);


  let tableauPhrases =  subscription.description !== '' ?  subscription.description.split("\n\n")  : '';

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelectSubscription({ ...subscription, selected: !isSelected });
    console.log("isSelected:", isUserSub);
  };

  return (
    <div className={`subscription-card ${isUserSub ? "selected" : ""}`}>
      <div className="zone-pricing" >
          <h6>{subscription.name}</h6>
          <h2>{subscription.price}€ 
              <span> /mois</span>
          </h2>
      </div>
      <hr></hr>
      <div className="card-body-subscribe" >

         { tableauPhrases.map((value, index ) => (
          <div key={index}>
            <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
            <span> {value} </span>
          </div>
         )) }
      </div>
      <div className="btn-selection">
          <Button  onClick={handleSelect}>
            {isUserSub ? "Désélectionner" : "Sélectionner"}
          </Button>
      </div>
    </div>
  );
};

SubscriptionCard.propTypes = {};
SubscriptionCard.defaultProps = {};

export default SubscriptionCard;
