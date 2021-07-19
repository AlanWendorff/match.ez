import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHistory } from "@fortawesome/free-solid-svg-icons";
import "./MobileHeader.css";

const HeaderMobile = ({ color, buttonstatus, img, setLadder, setVs, setHistory, setTeamsAlive, setPreview }) => (
    <div className="header-mobile" style={{ backgroundColor: color.DarkMuted }}>
        {!setTeamsAlive && (
            <div
                className="waves-effect"
                onClick={() => {
                    setPreview();
                }}
                style={{ backgroundColor: buttonstatus.preview === true ? "#ffffff4d" : "" }}
            >
                <img src={img} />
            </div>
        )}
        <div
            className="waves-effect"
            onClick={setVs}
            style={{ backgroundColor: buttonstatus.vs === true ? "#ffffff4d" : "" }}
        >
            VS
        </div>
        <div
            className="waves-effect"
            onClick={setHistory}
            style={{ backgroundColor: buttonstatus.history === true ? "#ffffff4d" : "" }}
        >
            <FontAwesomeIcon icon={faHistory} />
        </div>
        {setTeamsAlive && (
            <div
                className="waves-effect"
                onClick={setLadder}
                style={{ backgroundColor: buttonstatus.ladder === true ? "#ffffff4d" : "" }}
            >
                <FontAwesomeIcon icon={faFire} />
            </div>
        )}
    </div>
);

/* {!setTeamsAlive ? (
    <div
        className="waves-effect"
        onClick={() => {
            setPreview();
        }}
        style={{ backgroundColor: buttonstatus.preview === true ? "#ffffff4d" : "" }}
    >
        <img src={img} />
    </div>
) : (
    <div
        className="waves-effect"
        onClick={setTeamsAlive}
        style={{ backgroundColor: buttonstatus.teamsAlive === true ? "#ffffff4d" : "" }}
    >
        <FontAwesomeIcon icon={faHeartbeat} />
    </div>
)} */

export default HeaderMobile;
