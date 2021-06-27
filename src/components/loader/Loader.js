import React from "react";
import "./Loader.css";

const Loader = ({transparent}) => (
    <div className={transparent ? "loader-transparent" : "loader background-color-4all"}>
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Loader;
