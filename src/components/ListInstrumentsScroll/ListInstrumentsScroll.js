import React from 'react';
import './ListInstrumentsScroll.scss';
import Alto from "../../components/instruments/Alto";
import Clarinette from "../../components/instruments/Clarinette";
import Flute from "../../components/instruments/Flute";
import MaestroAll from "../../components/instruments/MaestroAll";
import Piano from "../../components/instruments/Piano";
import Violoncelle from "../../components/instruments/Violoncelle";
import Violon from "../../components/instruments/Violon";
import Trombone from "../../components/instruments/Trombone";
import Hautbois from "../../components/instruments/Hautbois";
import OrchestreChambre from "../../components/instruments/OrchestreChambre";
import Voice from "../../components/instruments/Voice";
import InstrumentListIcons from '../../components/InstrumentListIcons/InstrumentListIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight ,faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ListInstrumentsScroll = () => {

    const track = document.getElementById('listTrack');

    const showNext = () => {
      track.scrollTo({
        left: track.scrollLeft + track.firstElementChild.offsetWidth,
        behavior: "smooth"
      });
    }

    const showPrevious = () => {
      track.scrollTo({
        left: track.scrollLeft - track.firstElementChild.offsetWidth,
        behavior: "smooth"
      });
    }

  return (
  <div className='list-intruments'>
      <div className="carrousel-container" id="data-slider" >
          <button className="slider__button prev" onClick={showPrevious}  >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="carrousel intruments" id='listTrack'>
              <InstrumentListIcons instrument={<MaestroAll />} nameInstrument="Tous" />
              <InstrumentListIcons instrument={<Clarinette />} nameInstrument="Clarinette" />
              <InstrumentListIcons instrument={<Flute />} nameInstrument="Flute" />
              <InstrumentListIcons instrument={<Piano />} nameInstrument="Piano" />
              <InstrumentListIcons instrument={<Violoncelle />} nameInstrument="Violoncelle" />
              <InstrumentListIcons instrument={<Violon />} nameInstrument="Violon" />
              <InstrumentListIcons instrument={<Alto />} nameInstrument="Alto" />
              <InstrumentListIcons instrument={<Trombone />} nameInstrument="Trombone" />
              <InstrumentListIcons instrument={<Hautbois />} nameInstrument="Hautbois" />
              <InstrumentListIcons instrument={<OrchestreChambre />} nameInstrument={"Orchestre"} />
              <InstrumentListIcons instrument={<Voice />} nameInstrument="Voix" />
          </div>
          <button className="slider__button next" onClick={showNext}  >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
      </div>
  </div>
)};


export default ListInstrumentsScroll;