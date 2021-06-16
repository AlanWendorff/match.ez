import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocationContext } from "../Context/LocationContext";
import { Link } from "react-router-dom";
import {
    faCheck,
    faCog,
    faDownload,
    faFilm,
    faNewspaper,
    faVolumeMute,
    faVolumeUp,
    faListOl,
    faCompass,
    faInfo,
    faEnvelope,
    faCode,
    faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { NEWS, RANKING, ABOUT, CONTACT } from "../../routes/routes";
import "./more.css";

const More = ({ handleInstallClick, isinstalled, setIsInstalled }) => {
    const { getLocation, isallowed } = useContext(LocationContext);
    const [hidesettings, setHideSettings] = useState(false);
    const [hideabout, setHideAbout] = useState(false);
    const [sound, setSound] = useState(true);
    const [anim, setAnim] = useState(true);
    const [turnaround, setTurnAround] = useState("");
    const OPTION_STYLE = "option animate__animated animate__fadeInRight animate__faster cursor-pointer";

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("sounds")) === false) {
            setSound(false);
        }
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        } else {
            setIsInstalled(false);
        }

        if (JSON.parse(localStorage.getItem("animations")) === false) {
            setAnim(false);
        }
    }, []);

    const turnOffSound = () => {
        localStorage.setItem("sounds", false);
        setSound(false);
    };

    const turnOnSound = () => {
        setSound(true);
        localStorage.setItem("sounds", true);
    };

    const turnOffAnim = () => {
        localStorage.setItem("animations", false);
        setAnim(false);
    };

    const turnOnAnim = () => {
        setAnim(true);
        localStorage.setItem("animations", true);
    };

    const turnAroundIcon = () => {
        setTurnAround(hidesettings ? "rotate-icon-right-side" : "rotate-icon-left-side");
        setTimeout(() => {
            setTurnAround("");
        }, 300);
    };

    return (
        <div className="options noselect background-color-4all">
            <div className="scroll">
                <div className="column-align width-100percent ">
                    <Link to={RANKING} className={OPTION_STYLE}>
                        <div>
                            <FontAwesomeIcon icon={faListOl} />
                            <span>World Ranking</span>
                        </div>
                    </Link>
                    <hr />

                    <Link to={NEWS} className={OPTION_STYLE}>
                        <div>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>News</span>
                        </div>
                    </Link>

                    <hr />

                    <div
                        className="option animate__animated animate__fadeInRight animate__faster cursor-pointer settings"
                        onClick={() => {
                            turnAroundIcon();
                            setHideSettings(hidesettings ? false : true);
                        }}
                    >
                        <div>
                            <FontAwesomeIcon className={turnaround} icon={faCog} />
                            <span>Settings</span>
                        </div>
                    </div>

                    {hidesettings && (
                        <>
                            <hr />
                            <div
                                className="border-for-submenu-items margin-left-20px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                                onClick={() => {
                                    handleInstallClick();
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={!isinstalled ? faDownload : faCheck} />
                                    <span>
                                        {!isinstalled ? "Install Progresive Web App" : "App installed successfully"}
                                    </span>
                                </div>
                            </div>
                            <hr className="margin-left-20px" />
                            <div
                                className="border-for-submenu-items margin-left-20px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                                onClick={() => {
                                    getLocation();
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faCompass} />
                                    <span>
                                        {isallowed === "prompt"
                                            ? "Activate location"
                                            : isallowed === "granted"
                                            ? "Location allowed"
                                            : "Location was denied"}
                                    </span>
                                </div>
                            </div>
                            <hr className="margin-left-20px" />
                            <div
                                className="border-for-submenu-items margin-left-20px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                                onClick={() => {
                                    !sound ? turnOnSound() : turnOffSound();
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={!sound ? faVolumeMute : faVolumeUp} />
                                    <span>{sound ? "Sound On" : "Sound Off"}</span>
                                </div>
                            </div>
                            <hr className="margin-left-20px" />
                            <div
                                className="border-for-submenu-items margin-left-20px margin-bottom-15px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                                onClick={() => {
                                    !anim ? turnOnAnim() : turnOffAnim();
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon className={anim ? "move" : ""} icon={faFilm} />
                                    <span>{anim ? "Animations On" : "Animations Off"}</span>
                                </div>
                            </div>
                        </>
                    )}

                    <hr />

                    <div
                        className="option animate__animated animate__fadeInRight animate__faster cursor-pointer settings"
                        onClick={() => setHideAbout(hideabout ? false : true)}
                    >
                        <div>
                            <FontAwesomeIcon icon={faInfo} />
                            <span>About</span>
                        </div>
                    </div>

                    {hideabout && (
                        <>
                            <hr />
                            <a
                                className="border-for-submenu-items margin-left-20px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/Kremowy"
                            >
                                <div>
                                    <FontAwesomeIcon icon={faCode} />
                                    <span>By KremoWy</span>
                                </div>
                            </a>

                            <hr />

                            <Link to={CONTACT} className={OPTION_STYLE + " border-for-submenu-items margin-left-20px"}>
                                <div>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>Contact me</span>
                                </div>
                            </Link>

                            <hr />

                            <Link to={ABOUT} className={OPTION_STYLE + " border-for-submenu-items margin-left-20px"}>
                                <div>
                                    <FontAwesomeIcon icon={faCubes} />
                                    <span>About the web</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <span className="animate__animated animate__fadeInUp animate__faster">
                All Rights Reserved. {new Date().getFullYear()}
            </span>
        </div>
    );
};

export default More;
