import React from "react";
import react from "../../assets/images/about/reactjs.png";
import node from "../../assets/images/about/nodejs.svg";
import firebase from "../../assets/images/about/firebase.png";
import css from "../../assets/images/about/css.svg";
/* import panda from "../../images/about/panda.jpg";
import demo from "../../images/about/demo.png";
import teams from "../../images/about/teams.png";
import matchezlogo from "../../images/about/matchezlogo.png"; */
import "./About.css";

/* const colors = {
    DarkMuted: "#4d4c34",
    DarkVibrant: "#041424",
    LightMuted: "#bcbcc4",
    LightVibrant: "#dfda9a",
    Muted: "#9c9444",
    Vibrant: "#c4bc44",
}; */

const About = () => (
    <div className="about-container font-gilroy">
        <h1 className="font-gilroy-bold animate__animated animate__fadeIn" id="top">
            Technologies
        </h1>
        <h5 className="font-gilroy animate__animated animate__fadeIn">
            Technologies that were used for <br /> the development of the web.
        </h5>
        <div className="technologies font-gilroy animate__animated animate__fadeInRight animate__faster">
            <a href="https://es.reactjs.org/" rel="noopener noreferrer" target="_blank">
                <div className="tech-logo-canvas">
                    <img src={react} alt="Frontend" />
                </div>
                <span className="react-color animate__animated animate__fadeInUp animate__faster">ReactJS</span>
            </a>

            <a href="https://nodejs.org/es/" rel="noopener noreferrer" target="_blank">
                <div className="tech-logo-canvas">
                    <img src={node} alt="Backend" />
                </div>
                <span className="node-color animate__animated animate__fadeInUp animate__faster">NodeJS</span>
            </a>

            <a href="https://firebase.google.com/?hl=es" rel="noopener noreferrer" target="_blank">
                <div className="tech-logo-canvas">
                    <img src={firebase} alt="Database" />
                </div>
                <span className="firebase-color animate__animated animate__fadeInUp animate__faster">Firebase</span>
            </a>

            <a href="https://developer.mozilla.org/es/docs/Web/CSS" rel="noopener noreferrer" target="_blank">
                <div className="tech-logo-canvas">
                    <img className="css-logo" src={css} alt="Styles" />
                </div>
                <span className="css-color animate__animated animate__fadeInUp animate__faster">CSS</span>
            </a>
        </div>

        <h2 className="font-gilroy-bold animate__animated animate__fadeIn">Packages :</h2>

        <div className="about-item animate__animated animate__fadeInLeft animate__faster">
            <div className="how-install-packages">
                <img src={react} alt="ReactJS" />
                <span className="font-gilroy-bold">ReactJS Modules</span>
                <span>You can install dependencie using :</span>
                <span className="font-gilroy-bold">
                    npm i <span className="font-gilroy">package-name</span>
                </span>
                <span>or </span>
                <span className="font-gilroy-bold">
                    yarn add <span className="font-gilroy">package-name</span>
                </span>
            </div>

            <div className="dependencies">
                <a
                    href="https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/using-package-managers"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    font-awesome
                </a>
                <br />
                <a href="https://animate.style/" rel="noopener noreferrer" target="_blank">
                    animate.css
                </a>
                <br />
                <a href="https://www.npmjs.com/package/axios" rel="noopener noreferrer" target="_blank">
                    axios
                </a>
                <br />
                <a href="https://www.emailjs.com/docs/examples/reactjs/" rel="noopener noreferrer" target="_blank">
                    emailjs-com
                </a>
                <br />
                <a href="https://firebase.google.com/docs/web/setup?hl=es" rel="noopener noreferrer" target="_blank">
                    firebase
                </a>
                <br />
                <a href="https://www.npmjs.com/package/howler" rel="noopener noreferrer" target="_blank">
                    howler
                </a>
                <br />
                <a href="npmjs.com/package/moment" rel="noopener noreferrer" target="_blank">
                    moment
                </a>
                <br />
                <a href="https://www.npmjs.com/package/react-debounce-input" rel="noopener noreferrer" target="_blank">
                    react-debounce-input
                </a>
                <br />
                <a href="https://www.npmjs.com/package/react-lazyload" rel="noopener noreferrer" target="_blank">
                    react-lazyload
                </a>
                <br />
                <a href="https://www.npmjs.com/package/react-modal" rel="noopener noreferrer" target="_blank">
                    react-modal
                </a>
                <br />
                <a
                    href="https://www.npmjs.com/package/react-progressive-image"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    react-progressive-image
                </a>
                <br />
                <a href="https://www.npmjs.com/package/react-share" rel="noopener noreferrer" target="_blank">
                    react-share
                </a>
                <br />
                <a
                    href="https://www.npmjs.com/package/react-vertical-timeline-component"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    react-vertical-timeline-component
                </a>
            </div>
        </div>

        <div className="about-item animate__animated animate__fadeInLeft animate__faster">
            <div className="how-install-packages">
                <img src={node} alt="NodeJS" />
                <span className="font-gilroy-bold">NodeJS Modules</span>
                <span>You can install dependencie using :</span>
                <span className="font-gilroy-bold">
                    npm i <span className="font-gilroy">package-name</span>
                </span>
                <span>or </span>
                <span className="font-gilroy-bold">
                    yarn add <span className="font-gilroy">package-name</span>
                </span>
            </div>
            <div className="dependencies">
                <a href="https://www.npmjs.com/package/axios" rel="noopener noreferrer" target="_blank">
                    axios
                </a>
                <br />
                <a href="https://firebase.google.com/docs/web/setup?hl=es" rel="noopener noreferrer" target="_blank">
                    firebase
                </a>
                <br />
                <a href="https://www.npmjs.com/package/body-parser" rel="noopener noreferrer" target="_blank">
                    body-parser
                </a>
                <br />
                <a href="https://www.npmjs.com/package/colorthief" rel="noopener noreferrer" target="_blank">
                    colorthief
                </a>
                <br />
                <a href="https://www.npmjs.com/package/cors" rel="noopener noreferrer" target="_blank">
                    cors
                </a>
                <br />
                <a href="https://www.npmjs.com/package/dotenv" rel="noopener noreferrer" target="_blank">
                    dotenv
                </a>
                <br />
                <a href="https://www.npmjs.com/package/express" rel="noopener noreferrer" target="_blank">
                    express
                </a>
                <br />
                <a href="https://www.npmjs.com/package/hltv" rel="noopener noreferrer" target="_blank">
                    hltv
                </a>
                <br />
                <a href="https://www.npmjs.com/package/hltv-api" rel="noopener noreferrer" target="_blank">
                    hltv-api
                </a>
                <br />
                <a href="https://www.npmjs.com/package/node-vibrant" rel="noopener noreferrer" target="_blank">
                    node-vibrant
                </a>
                <br />
                <a href="https://www.npmjs.com/package/tinycolor2" rel="noopener noreferrer" target="_blank">
                    tinycolor2
                </a>
            </div>
        </div>

        {/* 
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
        </div> */}
    </div>
);

export default About;
