import React from "react";
import react from "../../Images/about/reactjs.png";
import node from "../../Images/about/nodejs.svg";
import firebase from "../../Images/about/firebase.png";
import css from "../../Images/about/css.svg";
import panda from "../../Images/about/panda.jpg";
import "./About.css";

const About = () => (
    <div className="about-container">
        <h1 className="font-gilroy-bold animate__animated animate__fadeIn">About</h1>
        <h3 className="font-gilroy animate__animated animate__fadeIn">Technologies</h3>
        <div className="technologies font-gilroy animate__animated animate__fadeInRight animate__faster">
            <div>
                <div className="tech-logo-canvas">
                    <img src={react} alt="Frontend" />
                </div>
                <span className="react-color animate__animated animate__fadeInUp animate__faster">ReactJS</span>
            </div>

            <div>
                <div className="tech-logo-canvas">
                    <img src={node} alt="Backend" />
                </div>
                <span className="node-color animate__animated animate__fadeInUp animate__faster">NodeJS</span>
            </div>

            <div>
                <div className="tech-logo-canvas">
                    <img src={firebase} alt="Database" />
                </div>
                <span className="firebase-color animate__animated animate__fadeInUp animate__faster">Firebase</span>
            </div>

            <div>
                <div className="tech-logo-canvas">
                    <img className="css-logo" src={css} alt="Styles" />
                </div>
                <span className="css-color animate__animated animate__fadeInUp animate__faster">CSS</span>
            </div>
        </div>

        <div className="about-item animate__animated animate__fadeInLeft animate__faster">
            <img src={panda} alt="api" />
            <p>
                logo de un lado
                <br />
                explicacion del otro lado
                <br />
                De donde salio la idea?
                <br />
                Como empezo la idea?
                <br />
                Porque empezo?
                <br />
                Como fue mutando la web?
                <br />
                Objetivo de la web?
                <br />
                Porque elegi tal tecnologia
                <br />
                seccion donde hablo sobre ella
                <br />
                Seccion citando a las librerias que uso
                <br />
                librerias separadas en backend y frontend c/ colores
            </p>
        </div>

        <div className="about-item animate__animated animate__fadeInRight animate__faster">
            <p>
                logo de un lado
                <br />
                explicacion del otro lado
            </p>
            <img src={panda} alt="api" />
        </div>

        <div className="about-item animate__animated animate__fadeInLeft animate__faster">
            <img src={panda} alt="api" />
            <p>
                logo de un lado
                <br />
                explicacion del otro lado
            </p>
        </div>
    </div>
);

export default About;
