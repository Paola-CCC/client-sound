import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({children}) => (
  <aside className="sidebar">
    <div className="content">
      <div className="filters-title">
        <FontAwesomeIcon
          icon={faSliders}
          size="lg"
        />
        <span>Filtres</span>
      </div>
      <div className="inputs-list-area">
      {children}
      </div>
    </div>
  </aside>
);

Sidebar.propTypes = {};
Sidebar.defaultProps = {};

export default Sidebar;
