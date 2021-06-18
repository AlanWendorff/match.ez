import React from "react";
import react from "../../Images/about/reactjs.png";
import node from "../../Images/about/nodejs.svg";
import firebase from "../../Images/about/firebase.png";
import css from "../../Images/about/css.svg";
import panda from "../../Images/about/panda.jpg";
import demo from "../../Images/about/demo.png";
import teams from "../../Images/about/teams.png";
import database from "../../Images/about/database.png";
import "./About.css";

const About = () => (
    <div className="about-container font-gilroy" id="top">
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
            <img src={database} alt="database" />
            <p>
                I came to a point where I wanted to show information about tournaments and teams from all over the
                world.
                <br />
                <br />
                Give to the user an easy way to view information about their favorite team.
                <br />
                <br />
                That is how I integrate a realtime database using firebase services. To store simple information about
                teams. Id, img, name, and colors.
                <br />
                <br />
                <a href="#panda">Next episode</a>
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
    </div>
);

export default About;
