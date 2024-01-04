import React from "react";
// import PropTypes from "prop-types";
import "./HomeHero.scss";
import { Button, InputSearch, InputSelect } from "../../common/Index";
import Navigation from "../Navigation/Navigation";
import ListInstrumentsScroll from "../ListInstrumentsScroll/ListInstrumentsScroll";


const HomeHero = ({
  professorsList,
  selectedProfessor,
  handleSelectedProfessor,
  categoryList,
  selectedCategory,
  handleSelectedCategory,
  compositorList,
  selectedCompositor,
  handleSelectedCompositor,
  searchValue,
  handleSearchValue,
  handleFilter
}) => {

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

      <div className="global-forms-container">
          <div className="container-forms">

            <div className="container-line">
              <span className="overlay">INSTRUMENTS </span>
            </div>
            < ListInstrumentsScroll />
            <div className="introduction-forms">
              <InputSelect
                label={("Professeurs").toUpperCase()}
                options={professorsList}
                value={selectedProfessor}
                onChange={handleSelectedProfessor}
              />

              <InputSelect
                label={("Catégories").toUpperCase()}
                options={categoryList}
                value={selectedCategory}
                onChange={handleSelectedCategory}
              />

              <InputSelect
                label={("Compositeurs").toUpperCase()}
                options={compositorList}
                value={selectedCompositor}
                onChange={handleSelectedCompositor}
              />

              <InputSearch
                value={searchValue}
                placeholder="Rechercher"
                onChange={handleSearchValue}
              /> 
              <div>
                <Button kind={"primary"} onClick={handleFilter}> Rechercher</Button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HomeHero;
