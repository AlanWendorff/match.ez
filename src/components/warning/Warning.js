import React from "react";
import { Link } from "react-router-dom";
import "./Warning.css";

const Warning = () => {
  return (
    <div className="warning font-gilroy background-color-4all">
      <div className="home-button-container">
        <p>Something happened.</p>
        <Link to="/" className="waves-effect waves-light btn red darken-4">
          <i className="material-icons left">home</i>Home
        </Link>
      </div>
    </div>
  );
};

export default Warning;
