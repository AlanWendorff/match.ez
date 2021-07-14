import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="warning font-gilroy background-color-4all height-100vh-pad-bot-90p">
        <div className="home-button-container">
            <p>Page Not Found :'(</p>
            <Link to="/" className="waves-effect waves-light btn cyan">
                <i className="material-icons left">home</i>Home
            </Link>
        </div>
    </div>
);

export default NotFound;
