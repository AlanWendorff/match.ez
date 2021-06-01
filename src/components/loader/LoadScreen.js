import React from "react";
import "./loader.css";

const LoadScreen = () => (
  <div className="loader-container">
    <div className="preloader-wrapper active spinner-loader">
      <div className="spinner-layer spinner-color">
        <div className="circle-clipper left">
          <div className="circle spinner-width"></div>
        </div>
        <div className="gap-patch">
          <div className="circle spinner-width"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle spinner-width"></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadScreen;
