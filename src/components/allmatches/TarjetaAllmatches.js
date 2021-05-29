import React from "react";
import { faClock, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOOKPROFILE } from "../../titlestag/titlestag";
import { PlaySound } from "../../utility/PlaySound";
import { TEAM, TOURNAMENT } from "../../routes/routes";
import { Link } from "react-router-dom";
import TeamRanking from "../TeamRanking/TeamRanking";
import ProgressiveImage from "react-progressive-image";
import Moment from "moment";
import nopic from "../../Images/nopic.png";
import loader from "../../Images/loader.gif";
import toBeDefined from "../../Images/toBeDefined.png";
import "../OneTeamCard/tarjetaUpcomingMatch.css";

const TarjetaAllmatches = ({ match }) => {
  const {
    opponents,
    league,
    begin_at,
    stage,
    serie,
    bestOf,
    tournament,
    status,
    official_stream_url,
    results,
  } = match;

  const dateUser = Moment(Date.now()).format("MM-DD-YYYY");
  const dateMatch = Moment(begin_at).format("MM-DD-YYYY");
  let aTeamId;
  let colorTeamA;
  let colorTeamB;
  let aTeamName = "";
  let bTeamName = "";
  let bTeamId = "";
  let statusStream = "Streaming off";
  let statusMatch = "Today " + Moment(begin_at).format("H:mm") + "hs";
  const TeamLogoA =
    opponents[0] !== false
      ? opponents[0].opponent.image_url === null
        ? nopic
        : opponents[0].opponent.image_url
      : toBeDefined;
  const TeamLogoB =
    opponents[1] !== false
      ? opponents[1].opponent.image_url === null
        ? nopic
        : opponents[1].opponent.image_url
      : toBeDefined;

  const colorLeague = league.colors;

  if (opponents[0] !== false) {
    if (opponents[0].opponent.colors !== {}) {
      colorTeamA = opponents[0].opponent.colors;
    } else {
      colorTeamA = {
        DarkVibrant: "#2d6da3",
      };
    }
  } else {
    colorTeamA = {
      DarkVibrant: "#2d6da3",
    };
  }

  if (opponents[1] !== false) {
    if (opponents[1].opponent.colors !== {}) {
      colorTeamB = opponents[1].opponent.colors;
    } else {
      colorTeamB = {
        DarkVibrant: "#2d6da3",
      };
    }
  } else {
    colorTeamB = {
      DarkVibrant: "#2d6da3",
    };
  }

  if (opponents[0] !== false) {
    aTeamId = opponents[0].opponent.id;
    aTeamName = opponents[0].opponent.name;
  } else {
    aTeamName = "To be defined";
  }
  if (opponents[1] !== false) {
    bTeamId = opponents[1].opponent.id;
    bTeamName = opponents[1].opponent.name;
  } else {
    bTeamName = "To be defined";
  }

  if (status === "running") {
    official_stream_url === null
      ? (statusStream = "PLAYING (no stream)")
      : (statusStream = "LIVE");
    statusMatch = "¡Playing Now!";
    return (
      <div
        className={`card posicion-tarjeta tamano-tarjeta-previo font-gilroy ${
          JSON.parse(localStorage.getItem("animations")) !== false &&
          "animate__animated"
        } animate__fadeInDown`}
      >
        <div className="col s12 m7 posicion-tarjeta">
          <div className="card-image">
            <div className="card-image container-info cursor-default padding-top-8">
              <div className="live-league-container">
                <Link
                  to={TOURNAMENT.replace(":tournamentId", tournament.league_id)}
                  className="text-center head-font highlight-text"
                  style={{ color: `${colorLeague.DarkVibrant}` }}
                >
                  {" "}
                  {league.name + " " + serie.full_name}{" "}
                </Link>
              </div>

              <div className="live-container-puntos-logos-upcoming">
                <Link to={TEAM.replace(":teamid", opponents[0].opponent.id)}>
                  <div className="team-canvas">
                    <ProgressiveImage src={TeamLogoA} placeholder={loader}>
                      {(src) => (
                        <img
                          title={LOOKPROFILE + opponents[0].opponent.name}
                          alt="a team"
                          className="size-team-logo"
                          src={src}
                        />
                      )}
                    </ProgressiveImage>
                  </div>
                </Link>

                <div title="Partidos ganados en la serie">
                  <div
                    className="points font-gilroy-bold"
                    title="Partidos ganados en la serie"
                  >
                    <p className="match-winner point-A">{results[0].score}</p>
                    <p>-</p>
                    <p className="match-winner point-B">{results[1].score}</p>
                  </div>
                </div>

                <Link to={TEAM.replace(":teamid", opponents[1].opponent.id)}>
                  <div className="team-canvas">
                    <ProgressiveImage src={TeamLogoB} placeholder={loader}>
                      {(src) => (
                        <img
                          title={LOOKPROFILE + opponents[1].opponent.name}
                          alt="b team"
                          className="size-team-logo"
                          src={src}
                        />
                      )}
                    </ProgressiveImage>
                  </div>
                </Link>
              </div>

              <div className="container-label color-text-white letter-spacing">
                <p
                  className="label-teams pill"
                  style={{
                    backgroundColor: colorTeamA.DarkVibrant,
                    fontSize: opponents[0].opponent.name.length > 11 && "12px",
                    lineHeight: aTeamName.length > 11 && "14px",
                  }}
                >
                  {opponents[0].opponent.name}
                </p>
                <p className="modalidad-past-match"></p>
                <p
                  className="label-teams pill"
                  style={{
                    backgroundColor: colorTeamB.DarkVibrant,
                    fontSize: opponents[1].opponent.name.length > 11 && "12px",
                    lineHeight: bTeamName.length > 11 && "14px",
                  }}
                >
                  {opponents[1].opponent.name}
                </p>
              </div>

              <div className="rankings-label">
                <TeamRanking name={aTeamName} />
                <p className="modalidad-past-match font-size">{bestOf}</p>
                <TeamRanking name={bTeamName} />
              </div>

              <div className="match-data">
                <span className="font-size text-align-start">
                  <span style={{ color: colorLeague.DarkVibrant }}>
                    <FontAwesomeIcon
                      className="turn-left-90"
                      icon={faCodeBranch}
                    />
                  </span>
                  <span className="data">{stage}</span>
                </span>

                <span className="font-size text-align-end">
                  <span style={{ color: colorLeague.DarkVibrant }}>
                    <FontAwesomeIcon icon={faClock} />{" "}
                  </span>
                  <span className="data">
                    {Moment(begin_at).format("H:mm")} hs
                  </span>
                </span>
              </div>

              <a
                className="card-action live-streaming-box-bottom-padding live-streaming-box-container"
                rel="noopener noreferrer"
                target="_blank"
                href={official_stream_url}
                onClick={() => {
                  official_stream_url !== null && PlaySound();
                }}
              >
                <span className="stream-font-color-LIVE">
                  {" "}
                  {statusStream} <span className="dot-indicator"></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`card posicion-tarjeta tamano-tarjeta-previo font-gilroy ${
          JSON.parse(localStorage.getItem("animations")) !== false &&
          "animate__animated"
        } animate__fadeInDown`}
      >
        <div className="card-image">
          <p className="text-align-center cursor-default font-size mb-0">
            <Link
              to={TOURNAMENT.replace(":tournamentId", tournament.league_id)}
              className="label-data-style highlight-text"
              style={{ color: colorLeague.DarkVibrant }}
            >
              {league.name + " " + serie.full_name}
            </Link>
          </p>

          <div className="card-image container-info cursor-default">
            <div className="hoy-esquina-container">
              <p
                className={`labels-esquinas text-align-start ${
                  stage.toLowerCase().includes("final") && "font-gilroy-bold"
                }`}
              >
                {stage}
              </p>
              {dateUser === dateMatch ? (
                <p className="hoy-esquina">{statusMatch}</p>
              ) : (
                <p className="labels-esquinas text-align-end">
                  {Moment(begin_at).format("Do")}{" "}
                  {Moment(begin_at).format("MMMM - H:mm")} hs
                </p>
              )}
            </div>

            <div className="container-puntosYlogos">
              <Link
                to={
                  aTeamName === "To be defined"
                    ? "/"
                    : TEAM.replace(":teamid", aTeamId)
                }
              >
                <div className="team-canvas">
                  <ProgressiveImage src={TeamLogoA} placeholder={loader}>
                    {(src) => (
                      <img
                        title={
                          aTeamName !== "To be defined"
                            ? LOOKPROFILE + aTeamName
                            : undefined
                        }
                        alt="a team"
                        className="size-team-logo"
                        src={src}
                      />
                    )}
                  </ProgressiveImage>
                </div>
              </Link>

              <div className="versus-label">
                <p>VS</p>
              </div>

              <Link
                to={
                  bTeamName === "To be defined"
                    ? "/"
                    : TEAM.replace(":teamid", bTeamId)
                }
              >
                <div className="team-canvas">
                  <ProgressiveImage src={TeamLogoB} placeholder={loader}>
                    {(src) => (
                      <img
                        title={
                          bTeamName !== "To be defined"
                            ? LOOKPROFILE + bTeamName
                            : undefined
                        }
                        alt="b team"
                        className="size-team-logo"
                        src={src}
                      />
                    )}
                  </ProgressiveImage>
                </div>
              </Link>
            </div>

            <div className="container-label color-text-white letter-spacing">
              <p
                className="label-teams pill"
                style={{
                  backgroundColor: colorTeamA.DarkVibrant,
                  fontSize: aTeamName.length > 11 && "12px",
                  lineHeight: aTeamName.length > 11 && "14px",
                }}
              >
                {aTeamName}
              </p>
              <p className="modalidad-past-match font-size"></p>
              <p
                className="label-teams pill"
                style={{
                  backgroundColor: colorTeamB.DarkVibrant,
                  fontSize: bTeamName.length > 11 && "12px",
                  lineHeight: bTeamName.length > 11 && "14px",
                }}
              >
                {bTeamName}
              </p>
            </div>

            <div className="rankings-label">
              <TeamRanking name={aTeamName} />
              <p className="modalidad-past-match font-size">{bestOf}</p>
              <TeamRanking name={bTeamName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TarjetaAllmatches;
