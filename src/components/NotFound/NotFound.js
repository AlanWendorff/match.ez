import React from "react";
import { Link } from "react-router-dom";
import "../Warning/Warning.css";

const NotFound = () => (
    <div className="height-100vh-pad-bot-90p warning font-gilroy background-color-4all">
        <div className="home-button-container">
            <p>Page Not Found :'(</p>
            <Link to="/" className="waves-effect waves-light btn cyan">
                Home
            </Link>
        </div>
    </div>
);

export default NotFound;
