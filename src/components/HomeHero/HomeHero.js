import React from "react";
// import PropTypes from "prop-types";
import "./HomeHero.scss";
import Navigation from "../Navigation/Navigation";


const HomeHero = () => {

  return (
    <div id="form-search" className="container-home-hero" tabIndex={0}>
      <Navigation />
      <div className="title">
        <h1> Saline royale academy </h1>
        <h4>Apprenez au côté des meilleurs musiciens au monde</h4>
        <p>
          Découvrez le plus grand catalogue de cours de musique classique en ligne
        </p>
      </div>
    </div>
  );
};

export default HomeHero;
