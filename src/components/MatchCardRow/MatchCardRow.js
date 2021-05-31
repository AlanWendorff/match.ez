import React, { useState } from "react";
import {
  faCalendarDay,
  faClock,
  faSortDown,
  faSortUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { PlaySound } from "../../utility/PlaySound";
import { Link } from "react-router-dom";
import { TEAM, TOURNAMENT } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TeamRanking from "../TeamRanking/TeamRanking";
import {
  evalColors,
  getMessage,
  evalImg,
  evalName,
  getMessageLive,
} from "./Helper";
import ProgressiveImage from "react-progressive-image";
import twitch from "../../Images/twitch.png";
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

  const MESSAGE =
    status === "running"
      ? getMessageLive(
          opponents,
          bestOf,
          league,
          serie,
          results,
          official_stream_url,
          stage
        )
      : getMessage(opponents, bestOf, begin_at, league, serie);

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
            <div className="row-team">
              <div>
                <ProgressiveImage
                  src={evalImg(opponents, 0)}
                  placeholder={loader}
                >
                  {(src) => (
                    <img alt="a team" className="team-logo" src={src} />
                  )}
                </ProgressiveImage>
              </div>
              

              <Link
                  to={evalName(opponents, 0) === "To be defined"? "#" : TEAM.replace(":teamid", opponents[0].opponent.id)}
                  style={{
                    backgroundColor: COLOR_TEAM_A.DarkVibrant,
                    fontSize: evalName(opponents, 0).length > 11 && "12px",
                  }}
                >
                {evalName(opponents, 0)}
                <TeamRanking name={evalName(opponents, 0)}/>
              </Link>

              {status === "running" && (
                <p className="font-gilroy-bold">{results[0].score}</p>
              )}
            </div>

            <div className="row-team">
              

              <div>
                <ProgressiveImage
                  src={evalImg(opponents, 1)}
                  placeholder={loader}
                >
                  {(src) => (
                    <img alt="b team" className="team-logo" src={src} />
                  )}
                </ProgressiveImage>
              </div>

              <Link 
                to={evalName(opponents, 1) === "To be defined"? "#" : TEAM.replace(":teamid", opponents[1].opponent.id)}
                style={{
                  backgroundColor: COLOR_TEAM_B.DarkVibrant,
                  fontSize: evalName(opponents, 1).length > 11 && "12px",
                }}
              >
                {evalName(opponents, 1)}
                <TeamRanking name={evalName(opponents, 1)}/>
              </Link>

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

            <div className="row-card-share">
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
              Started at {Moment(begin_at).format("H:mm")} hs
            </span>
          </div>

          <div className="info-container">
            <img className="twitch-logo" src={twitch} alt="twitch" />
            <a
              className="text-align-end"
              rel="noopener noreferrer"
              target="_blank"
              href={official_stream_url}
              onClick={() => {
                official_stream_url !== null && PlaySound();
              }}
            >
              {official_stream_url === null
                ? "Playing (no stream available)"
                : official_stream_url}
            </a>
          </div>

          <div className="row-card-share">
            <Share Facebook={MESSAGE} Twitter={MESSAGE} Wapp={MESSAGE} />
          </div>
        </>
      )}
    </div>
  );
};

export default MatchCardRow;
