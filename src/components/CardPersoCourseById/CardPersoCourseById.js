import React from 'react';
import Button from '../../common/Button/Button';

const CardPersoCourseById = ({handleShowMore , professorName ,canShowMore , biographyUserProf , handleOpenConversation , photo}) =>  {
  return (
  <div className="common-style infos-professors-area">
  <div className="photos-area">
    <img
      className="fit-picture"
      src={photo}
      alt="Grapefruit slice atop a pile of other slices"
    />
  </div>

  <div className="infos-course-area">
    <h3> {professorName} </h3>
    <div className="text-area">
      <p className={canShowMore === false ? "hidden-more" : ""}>
        {biographyUserProf}
      </p>
    </div>
    <div className="btn-area">
      <Button kind="secondary" disabled={false} onClick={handleShowMore}>
      Voir plus
      </Button>
      <Button kind="primary" disabled={false} onClick={handleOpenConversation}>
      Envoyer un message
      </Button>
    </div>
  </div>
  </div>
)};

CardPersoCourseById.propTypes = {};

CardPersoCourseById.defaultProps = {};

export default CardPersoCourseById;
