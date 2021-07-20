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
import { NEWS, RANKING, ABOUT, CONTACT, WALLPAPER } from "../../routes/routes";
import "./More.css";

const More = ({ handleInstallClick, isinstalled, setIsInstalled }) => {
    const { getLocation, isallowed } = useContext(LocationContext);
    const [hidesettings, setHideSettings] = useState(false);
    const [hideabout, setHideAbout] = useState(false);
    const [sound, setSound] = useState(true);
    const [turnaround, setTurnAround] = useState("");
    const OPTION_STYLE = "option cursor-pointer";

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("sounds")) === false) {
            setSound(false);
        }
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        } else {
            setIsInstalled(false);
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

    const turnAroundIcon = () => {
        setTurnAround(hidesettings ? "rotate-icon-right-side" : "rotate-icon-left-side");
        setTimeout(() => {
            setTurnAround("");
        }, 300);
    };

    return (
        <div className="options noselect background-color-4all">
            <div className="scroll">
                <div className="column-align align-enter width-100percent animate-slide-left-to-right">
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
                        className="option cursor-pointer settings"
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
                                className="border-for-submenu-items margin-for-submenu-items option cursor-pointer"
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

                            <Link
                                to={CONTACT}
                                className={OPTION_STYLE + " border-for-submenu-items margin-for-submenu-items"}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>Contact me</span>
                                </div>
                            </Link>

                            <hr />

                            <Link
                                to={ABOUT}
                                className={OPTION_STYLE + " border-for-submenu-items margin-for-submenu-items"}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faCubes} />
                                    <span>About the web</span>
                                </div>
                            </Link>
                        </>
                    )}

                    <hr />

                    <div
                        className="option cursor-pointer settings"
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
                                className="border-for-submenu-items margin-for-submenu-items option cursor-pointer"
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
                            <hr className="margin-for-submenu-items" />
                            <div
                                className="border-for-submenu-items margin-for-submenu-items option cursor-pointer"
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
                            <hr className="margin-for-submenu-items" />
                            <div
                                className="border-for-submenu-items margin-for-submenu-items option cursor-pointer"
                                onClick={() => {
                                    !sound ? turnOnSound() : turnOffSound();
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={!sound ? faVolumeMute : faVolumeUp} />
                                    <span>{sound ? "Sound On" : "Sound Off"}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <span className="rights">All Rights Reserved. {new Date().getFullYear()}</span>
            </div>
        </div>
    );
};

export default More;
