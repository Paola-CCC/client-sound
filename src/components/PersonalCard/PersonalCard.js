import React from 'react';
import './PersonalCard.scss';
import Button from '../../common/Button/Button';

const PersonalCard = ({ srcImg,altImg,username,email,registrationDate,instrument, subscription, handleClick}) => {
  return (
    <div className="container-personalspace">
      <h4>Votre profil :</h4>
      <div className="personal-card-users">
        <div className="img-profile">
          <img
            src={process.env.REACT_APP_API_URL + srcImg} alt={altImg}
          />
        </div>

        <div className="users-perso-datas">
          <div className="name">
            <h5>{username}</h5>
          </div>
          <div className="informations-grp">
            <div className="perso-infos infos-label">
              <p>Email : </p>
              <p>Date d'inscription : </p>
              <p>Instrument(s) : </p>
              <p>Abonnement : </p>
            </div>
            <div className="perso-infos infos-values">
              <p>{email}</p>
              <p>{registrationDate}</p>
              <p>{instrument}</p>
              <p>{subscription}</p>
            </div>
          </div>
          <div className="btn-zone">
            <Button kind="primary" onClick={handleClick}>
              Modifier mes informations
            </Button> 
          </div>
        </div>
      </div>

    </div>
    )
};

export default PersonalCard;