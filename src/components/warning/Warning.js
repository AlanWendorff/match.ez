import React from "react";
import { Link } from "react-router-dom";
import "./Warning.css";

const Warning = () => (
    <div className="height-100vh-pad-bot-90p warning font-gilroy background-color-4all">
        <div className="home-button-container">
            <p>Something happened.</p>
            <Link to="/" className="waves-effect waves-light btn red darken-4">
                Home
            </Link>
        </div>
    </div>
);

export default Warning;
