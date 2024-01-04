import React from "react";
import "./LoadingElements.scss";

const LoadingElements = () => (
  <div className="LoadingElements">
    <div className="container-loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

LoadingElements.propTypes = {};

LoadingElements.defaultProps = {};

export default LoadingElements;
