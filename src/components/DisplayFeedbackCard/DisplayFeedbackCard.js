import React from "react";
import "./DisplayFeedbackCard.scss";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const DisplayFeedbackCard = () => {


  return (
    <>
      <FeedbackCard
        userName="Oussama H."
        city="Lyon"
        scoreFeedback={5}
        srcPictureUser="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWd-Ua8JTCMTU4tck8Es5MmCTHPiaZklDvqQ&usqp=CAU"
        altPicture="Description"
        textContent="Je suis très satisfait de ce site, il n'y a eu aucun problème dans l'apprentissage en ligne de la clarinette."
      />

      <FeedbackCard
        userName="Jeanne D."
        city="Paris"
        scoreFeedback={5}
        srcPictureUser="https://img.freepik.com/photos-premium/belle-jeune-femme-noire-mannequin-visage_33839-2328.jpg"
        altPicture="Description"
        textContent="De très bonnes formations de Piano,il faut être conscient qu'il faut beaucoup de temps pour tout métriser."
      />

      <FeedbackCard
        userName="John A."
        city="Paris"
        scoreFeedback={5}
        srcPictureUser="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFE3CtgBwmywVuoL0JXsdA4RdjKUTnTTfEOg&usqp=CAU"
        altPicture="Description"
        textContent="Jonathan Dasilva a une pédagogie exceptionnelle, très fort et très pertinent sur ces explications. Il explique dans les moindres détailles."
      />
    </>
  );
};

DisplayFeedbackCard.propTypes = {};

DisplayFeedbackCard.defaultProps = {};

export default DisplayFeedbackCard;
