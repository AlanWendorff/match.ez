import React from "react";
import react from "../../Images/about/reactjs.png";
import node from "../../Images/about/nodejs.svg";
import firebase from "../../Images/about/firebase.png";
import css from "../../Images/about/css.svg";
import panda from "../../Images/about/panda.jpg";
import demo from "../../Images/about/demo.png";
import teams from "../../Images/about/teams.png";
import matchezlogo from "../../Images/about/matchezlogo.png";
import "./About.css";

const colors = {
    DarkMuted: "#4d4c34",
    DarkVibrant: "#041424",
    LightMuted: "#bcbcc4",
    LightVibrant: "#dfda9a",
    Muted: "#9c9444",
    Vibrant: "#c4bc44",
};

const About = () => (
    <div className="about-container font-gilroy">
        <h1 className="font-gilroy-bold animate__animated animate__fadeIn" id="top">About</h1>
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
            <img src="https://cdn.pandascore.co/images/team/image/126709/9996.png" alt="9z" />
            <p>
                All started with 9z team and CS:GO.
                <br />
                <br />
                An idea to track his competitive matches to get the fan community a more easiest way to know info about
                matches and stats.
                <br />
                <br />
                <a href="#panda">Next episode</a>
            </p>
        </div>

        <div id="panda" className="about-item animate__animated animate__fadeInRight animate__faster">
            <p>
                That is how I met pandascore, a platform that provides a lot of information of esports in a single web
                API.
                <br />
                <br />
                <a href="#demo">Next episode</a>
            </p>
            <img src={panda} alt="api" />
        </div>

        <div id="demo" className="about-item animate__animated animate__fadeInLeft animate__faster">
            <img src={demo} alt="demo" />
            <p>
                With help I developed my first web app, a landing page that contains some information about matches
                exclusive for 9z team.
                <br />
                <br />
                <a href="#teams">Next episode</a>
            </p>
        </div>

        <div id="teams" className="about-item animate__animated animate__fadeInLeft animate__faster">
            <p>
                The challenge was climbing more and more. Implementing a lot of info of principally latam teams.
                <br />
                <br />
                <a href="#database">Next episode</a>
            </p>
            <img src={teams} alt="teams" />
        </div>

        <div id="database" className="about-item animate__animated animate__fadeInLeft animate__faster">
            <div className="liquid-example">
                <img
                    src="https://cdn.pandascore.co/images/team/image/3213/220px_team_liquidlogo_square.png"
                    alt="liquid"
                />
                <div className="colors-pallete">
                    <div style={{ backgroundColor: colors.DarkMuted }}></div>
                    <div style={{ backgroundColor: colors.DarkVibrant }}></div>
                    <div style={{ backgroundColor: colors.LightMuted }}></div>
                    <div style={{ backgroundColor: colors.LightVibrant }}></div>
                    <div style={{ backgroundColor: colors.Muted }}></div>
                    <div style={{ backgroundColor: colors.Vibrant }}></div>
                </div>
                <span>
                    <span className="font-gilroy-bold">name: </span>Liquid
                </span>
                <span>
                    <span className="font-gilroy-bold">id: </span>3213
                </span>
            </div>
            <p>
                I came to a point where I wanted to show information about tournaments and teams from all over the
                world.
                <br />
                <br />
                Give to the user an easy way to view information about their favorite team.
                <br />
                <br />
                That is how I integrate a realtime database using firebase services to store simple information about
                teams. Id, img, name, and colors.
                <br />
                <br />
                <a href="#backend">Next episode</a>
            </p>
        </div>

        <div id="backend" className="about-item animate__animated animate__fadeInLeft animate__faster">
            <p>
                Con esto se me presentaba un problema.
                <br />
                <br />
                Cada vez aparecen nuevos equipos y tenía que idear una manera automática de registrar nuevos equipos. Al
                mismo tiempo mi web presentaba un problema de CORS es por eso que decidí programar un backend.
                <br />
                <br />
                El backend fue la solución a todo. Mi web paso a ganar mas performance, lo que se traduce en más calidad
                y features para poder implementar.
                <br />
                <br />
                <a href="#actually">Next episode</a>
            </p>
            <img src={node} alt="node" />
        </div>

        <div id="actually" className="about-item animate__animated animate__fadeInLeft animate__faster">
            <img src={matchezlogo} alt="matchezlogo" />
            <p>
                Esto nos lleva al estado actual de la página web. 
                <br />
                <br />
                Con + 100 torneos y +500 equipos registrados.
                <br />
                <br />
                Dato
                curioso, la base de datos pesa 267Kb
                <br />
                <br />
                <a href="#top">Back to top</a>
            </p>
        </div>
    </div>
);

export default About;
