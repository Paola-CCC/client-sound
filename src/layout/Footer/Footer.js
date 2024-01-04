import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="footer">

      <ul className="list">
        <li>
          <Link to="/offers">Offres</Link>
        </li>
      </ul>
      <ul className="list">
        <li>
          <a href="https://www.facebook.com/salineroyaleacademy/"> <FontAwesomeIcon icon={faFacebook} /></a>
        </li>
        <li>
          <a href="https://www.instagram.com/salineroyaleacademy/?hl=fr">  <FontAwesomeIcon icon={faInstagram} /></a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/saline-royale-academy/?originalSubdomain=fr"> <FontAwesomeIcon icon={faLinkedin} /></a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCFEULSLZCpnrODoKJdqYVEg"> <FontAwesomeIcon icon={faYoutube} /></a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
