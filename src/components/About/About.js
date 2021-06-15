import React from "react";
import react from "../../Images/about/reactjs.png"
import "./About.css";

const About = () => (
    <div className="about-container">
        <h1 className="font-gilroy-bold animate__animated animate__fadeInDown animate__faster">About</h1>
        <h3>Technologies</h3>
        <div className="technologies">
            <img src={react} alt=""/>
        </div>
        <p>
            asdasd
            <hr />
            asdasd
        </p>
    </div>
);

export default About;
