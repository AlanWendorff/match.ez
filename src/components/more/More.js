import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCheck,
  faCodeBranch,
  faCog,
  faDownload,
  faFilm,
  faNewspaper,
  faVolumeMute,
  faVolumeUp,
  faListOl,
} from "@fortawesome/free-solid-svg-icons";
import { NEWS, RANKING } from "../../routes/routes";
import "./more.css";

const More = ({ handleInstallClick, isinstalled, setIsInstalled }) => {
  const year = new Date().getFullYear();
  const [hidecomponent, setHideComponent] = useState(false);
  const [sound, setSound] = useState(true);
  const [anim, setAnim] = useState(true);
  const [turnaround, setTurnAround] = useState("");

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
    hidecomponent ? setTurnAround("rotate-icon-right-side") : setTurnAround("rotate-icon-left-side");
    setTimeout(() => {
      setTurnAround("");
    }, 300);
  }

  return (
    <div
      className="options noselect"
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <div className="scroll">
        <div className="column-align width-100percent ">
          <Link
            to={RANKING}
            className="option animate__animated animate__fadeInRight animate__faster cursor-pointer"
          >
            <div>
              <FontAwesomeIcon icon={faListOl} />
              <span>World Ranking</span>
            </div>
          </Link>
          <hr />

          <Link
            to={NEWS}
            className="option animate__animated animate__fadeInRight animate__faster cursor-pointer"
          >
            <div>
              <FontAwesomeIcon icon={faNewspaper} />
              <span>News</span>
            </div>
          </Link>
          <hr />

          <a
            className="option animate__animated animate__fadeInRight animate__faster cursor-pointer"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Kremowy"
          >
            <div>
              <FontAwesomeIcon icon={faCodeBranch} />
              <span>Creator Github</span>
            </div>
          </a>
          <hr />

          <div
            className="option animate__animated animate__fadeInRight animate__faster cursor-pointer"
            onClick={() => {
              turnAroundIcon();
              hidecomponent ? setHideComponent(false) : setHideComponent(true);

            }}
          >
            <div>
              <FontAwesomeIcon className={turnaround} icon={faCog} />
              <span>Settings</span>
            </div>
          </div>
          {hidecomponent && <hr />}

          {hidecomponent && (
            <>
              <div
                className="margin-left-100px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                onClick={() => {
                  handleInstallClick();
                }}
              >
                <div>
                  <FontAwesomeIcon icon={!isinstalled ? faDownload : faCheck} />
                  <span>
                    {!isinstalled
                      ? "Install Progresive Web App"
                      : "App installed successfully"}
                  </span>
                </div>
              </div>
              <hr className="margin-left-100px" />
            </>
          )}

          {hidecomponent && (
            <>
              <div
                className="margin-left-100px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                onClick={() => {
                  !sound ? turnOnSound() : turnOffSound();
                }}
              >
                <div>
                  <FontAwesomeIcon icon={!sound ? faVolumeMute : faVolumeUp} />
                  <span>{sound ? "Sound On" : "Sound Off"}</span>
                </div>
              </div>
              <hr className="margin-left-100px" />
            </>
          )}

          {hidecomponent && (
            <>
              <div
                className="margin-bottom-15px margin-left-100px option animate__animated animate__fadeInRight animate__faster cursor-pointer"
                onClick={() => {
                  !anim ? turnOnAnim() : turnOffAnim();
                }}
              >
                <div>
                  <FontAwesomeIcon
                    className={anim ? "move" : ""}
                    icon={faFilm}
                  />
                  <span>{anim ? "Animations On" : "Animations Off"}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <span className="animate__animated animate__fadeInUp animate__faster">
        All Rights Reserved. {year}
      </span>
    </div>
  );
};

export default More;
