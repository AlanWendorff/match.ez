import React, { useState } from "react";
import {
  faCalendarDay,
  faClock,
  faSortDown,
  faSortUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { PlaySound } from "../../utility/PlaySound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { evalColors, getMessage, evalImg, evalName } from "./Helper";
import ProgressiveImage from "react-progressive-image";
import loader from "../../Images/loader.gif";
import Share from "../Share/Share";
import Moment from "moment";
import "./MatchCardRow.css";

const MatchCardRow = ({ match }) => {
  const [content, setContent] = useState(false);
  const {
    bestOf,
    league,
    serie,
    begin_at,
    opponents,
    results,
    stage,
    status,
    official_stream_url,
  } = match;
  const COLOR_LEAGUE = league.colors;
  const COLOR_TEAM_A = evalColors(opponents, 0);
  const COLOR_TEAM_B = evalColors(opponents, 1);

  const MESSAGE = getMessage(opponents, bestOf, begin_at, league, serie);

  return (
    <div
      className={`noselect card posicion-tarjeta match-card-row-size font-gilroy transition-effect animate__fadeInDown animate__faster ${
        JSON.parse(localStorage.getItem("animations")) !== false &&
        "animate__animated"
      }`}
    >
      <div className="card-image">
        <div className="card-image prev-game-content cursor-default">
          <div className="header" style={{ color: COLOR_LEAGUE.DarkVibrant }}>
            <span className="text-align-start">{league.name}</span>
            <span
              className={`text-align-end ${
                stage.toLowerCase().includes(" final") && "font-gilroy-bold"
              }`}
            >
              {stage}
            </span>
          </div>

          <div className="teams-info-container">
            <div className="row-team-name-gamewin">
              <div>
                <ProgressiveImage
                  src={evalImg(opponents, 0)}
                  placeholder={loader}
                >
                  {(src) => (
                    <img
                      alt="a team"
                      className="max-size-logo-prev-game"
                      src={src}
                    />
                  )}
                </ProgressiveImage>
              </div>
              <p
                style={{
                  backgroundColor: COLOR_TEAM_A.DarkVibrant,
                  color: "white",
                  fontSize: evalName(opponents, 0).length > 11 && "12px",
                }}
              >
                {evalName(opponents, 0)}
              </p>
              {status === "running" && (
                <p className="font-gilroy-bold">{results[0].score}</p>
              )}
            </div>

            <div className="row-team-name-gamewin">
              <div>
                <ProgressiveImage
                  src={evalImg(opponents, 1)}
                  placeholder={loader}
                >
                  {(src) => (
                    <img
                      alt="b team"
                      className="max-size-logo-prev-game"
                      src={src}
                    />
                  )}
                </ProgressiveImage>
              </div>
              <p
                style={{
                  backgroundColor: COLOR_TEAM_B.DarkVibrant,
                  color: "white",
                  fontSize: evalName(opponents, 1).length > 11 && "12px",
                }}
              >
                {evalName(opponents, 1)}
              </p>
              {status === "running" && (
                <p className="font-gilroy-bold">{results[1].score}</p>
              )}
            </div>

            <div className="text-in-card">
              <p
                className="bestof-prev-game"
                style={{ color: COLOR_LEAGUE.DarkMuted }}
              >
                {bestOf}
                {bestOf.includes("2") && " (match may end in a draw)"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {status !== "running" && (
        <div
          onClick={() => {
            content ? setContent(false) : setContent(true);
          }}
          className="sort-content"
        >
          <FontAwesomeIcon icon={!content ? faSortDown : faSortUp} />
        </div>
      )}

      {status !== "running" ? (
        content && (
          <>
            <div className="info-container">
              <span
                className="label-data-style"
                style={{ color: COLOR_LEAGUE.DarkVibrant }}
              >
                <FontAwesomeIcon icon={faTrophy} />
              </span>
              <span className="text-align-end">
                {league.name + " " + serie.full_name}
              </span>
            </div>

            <div className="info-container">
              <span
                className="label-data-style"
                style={{ color: COLOR_LEAGUE.DarkVibrant }}
              >
                <FontAwesomeIcon icon={faCalendarDay} />{" "}
              </span>
              <span className="text-align-end">
                {Moment(begin_at).format("Do")}{" "}
                {Moment(begin_at).format("MMMM - H:mm")} hs
              </span>
            </div>

            <div className="prevgame-share">
              <Share Facebook={MESSAGE} Twitter={MESSAGE} Wapp={MESSAGE} />
            </div>
          </>
        )
      ) : (
        <>
          <div className="info-container">
            <span
              className="label-data-style"
              style={{ color: COLOR_LEAGUE.DarkVibrant }}
            >
              <FontAwesomeIcon icon={faClock} />{" "}
            </span>
            <span className="text-align-end">
              {Moment(begin_at).format("H:mm")} hs
            </span>
          </div>

          <div className="info-container">
            <span
              className="label-data-style"
              style={{ color: COLOR_LEAGUE.DarkVibrant }}
            >
              <FontAwesomeIcon icon={faClock} />{" "}
            </span>
            <a
              className="text-align-end"
              rel="noopener noreferrer"
              target="_blank"
              href={official_stream_url}
              onClick={() => {
                official_stream_url !== null && PlaySound();
              }}
            >
              {official_stream_url === null? "Playing (no stream available)" : "Playing"}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchCardRow;
