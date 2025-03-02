import React from "react";
import './SubscriptionCard.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const SubscriptionCard = ({ subscription, onSelectSubscription, isUserSub }) => {
  
  // const [isSelected, setIsSelected] = useState(isUserSub);

  // const handleSelect = () => {
  //   setIsSelected(!isSelected);
  //   onSelectSubscription({ ...subscription, selected: !isSelected });
  // };

  return (
    <div className={`subscription-card ${isUserSub ? "selected" : ""}`}>
      <div className="zone-pricing" >
          <h6>{subscription.name}</h6>
          <h2>{subscription.price}€ 
              <span>/mois</span>
          </h2>
      </div>
      <hr></hr>


      { subscription.name === 'Premium' ?  (
      <div className="card-body-subscribe" >
            <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Accès illimité à toutes nos masterclasses. </span>
            </div>
            <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> De nouvelles vidéos sont disponibles chaque mois. </span>
            </div>

            <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Des interviews exclusives avec les plus grands professeurs du monde. </span>
            </div>

            <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Des réductions sur les Bootcamp d'été avec nos professionnels. </span>
            </div>
      </div>
      ) : (
        <div className="card-body-subscribe" > 
             <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Accès illimité à toutes nos masterclasses. </span>
            </div>
            <div >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> De nouvelles vidéos sont disponibles chaque mois. </span>
            </div>

            <div style={{ visibility: 'hidden'}}>
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Des interviews exclusives avec les plus grands professeurs du monde. </span>
            </div>

            <div style={{ visibility: 'hidden'}} >
              <FontAwesomeIcon icon={faCircleCheck}  size="lg" />
              <span> Des interviews exclusives avec les plus grands professeurs du monde. </span>
            </div>
        </div>
      )

      }
      <div className="btn-selection">
          {/* <Button  onClick={handleSelect}>
            {isUserSub ? "Désélectionner" : "Sélectionner"}
          </Button> */}
      </div>
    </div>
  );
};

export default SubscriptionCard;
