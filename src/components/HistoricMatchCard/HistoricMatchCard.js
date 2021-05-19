import React, { useContext, Fragment, useState } from "react";
import {
  faCalendarDay,
  faSortDown,
  faSortUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { PaletteContext } from "../Context/PaletteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOOKPROFILE } from "../../titlestag/titlestag";
import { getPlayerScore } from "./getPlayerScore";
import { TEAM } from "../../routes/routes";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";
import PlayerScore from "../PlayerScore/PlayerScore";
import Share from "../Share/Share";
import Moment from "moment";
import csgoLogoDefaultBlack from "../../Images/csgoLogoDefaultBlack.png";
import "../CompetitionCard/tarjetaMatchesCompletos.css";
import "./matchprevio.css";

const HistoricMatchCard = ({
  match,
  teamId,
  firstIndex,
  setPlayerScore,
  playerscore,
}) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(false);
  const {
    bestOf,
    league,
    serie,
    begin_at,
    id,
    opponents,
    results,
    stage,
  } = match;
  const { palette } = useContext(PaletteContext);
  const colorLeague = league.colors;
  const colorTeamA = opponents[0] !== false? opponents[0].opponent.colors : {
    DarkVibrant: "#2d6da3",
  }
  const colorTeamB = opponents[1] !== false? opponents[1].opponent.colors : {
    DarkVibrant: "#2d6da3",
  }

  const Facebook = `${opponents[0].opponent.name}: ${results[0].score} 
    ${opponents[1].opponent.name}: ${results[1].score}  
    ${league.name + " " + serie.full_name}
    `;
  const Twitter = `${opponents[0].opponent.name}: ${results[0].score} VS ${
    opponents[1].opponent.name
  }: ${results[1].score} | ${league.name + " " + serie.full_name} -> ${
    window.location.href
  }`;
  const Wapp = `${opponents[0].opponent.name}: ${results[0].score} VS ${
    opponents[1].opponent.name
  }: ${results[1].score} |  ${league.name + " " + serie.full_name} -> ${
    window.location.href
  }`;

  const playerScore = async () => {
    const { teams } = playerscore;
    if (teams === undefined) {
      setLoading(true);
      const { objPlayerScore } = await getPlayerScore(id);
      if (objPlayerScore) {
        setLoading(false);
        setPlayerScore(objPlayerScore);
      }
    }
  };

  return (
    <div
      className={`noselect card posicion-tarjeta size-prev-game font-gilroy transition-effect animate__fadeInDown animate__faster ${
        JSON.parse(localStorage.getItem("animations")) !== false &&
        "animate__animated"
      }`}
    >
      <div
        className="card-image"
        style={
          teamId && { borderTop: `5px solid ${colorLeague.lightVibrant}` }
        }
      >
        <div className="card-image prev-game-content cursor-default">
          <div className="prev-game-header-container">
            <p className="prev-game-header" style={{ color: palette.DarkMuted }}>
              {stage}
            </p>
          </div>

          <div className="prev-game-desktop">
            <div className="team-column">
              <Link to={TEAM.replace(":teamid", opponents[0].opponent.id)}>
                <div
                  className={
                    results[0].score < results[1].score
                      ? "match-loser-prevgame"
                      : "match-winner-prevgame"
                  }
                >
                  <ProgressiveImage
                    src={
                      opponents[0].opponent.image_url === null
                        ? csgoLogoDefaultBlack
                        : opponents[0].opponent.image_url
                    }
                    placeholder={csgoLogoDefaultBlack}
                  >
                    {(src) => (
                      <img
                        title={LOOKPROFILE + opponents[0].opponent.name}
                        alt="a team"
                        className="max-size-logo-prev-game"
                        src={src}
                      />
                    )}
                  </ProgressiveImage>
                </div>
              </Link>

              <p className="name-of-teams">{opponents[0].opponent.name}</p>
            </div>

            <div>
              <div className="game-win font-gilroy-bold">
                <p
                  className={
                    results[0].score < results[1].score
                      ? "match-loser point-A"
                      : "match-winner point-A"
                  }
                >
                  {results[0].score}
                </p>
                <p>-</p>
                <p
                  className={
                    results[0].score < results[1].score
                      ? "match-winner point-B"
                      : "match-loser point-B"
                  }
                >
                  {results[1].score}
                </p>
              </div>

              <p className="bestof-prev-game" style={{ color: palette.DarkMuted }}>
                {bestOf}
              </p>
            </div>

            <div className="team-column">
              <Link to={TEAM.replace(":teamid", opponents[1].opponent.id)}>
                <div
                  className={
                    results[0].score < results[1].score
                      ? "match-winner-prevgame"
                      : "match-loser-prevgame"
                  }
                >
                  <ProgressiveImage
                    src={
                      opponents[1].opponent.image_url === null
                        ? csgoLogoDefaultBlack
                        : opponents[1].opponent.image_url
                    }
                    placeholder={csgoLogoDefaultBlack}
                  >
                    {(src) => (
                      <img
                        title={LOOKPROFILE + opponents[1].opponent.name}
                        alt="b team"
                        className="max-size-logo-prev-game"
                        src={src}
                      />
                    )}
                  </ProgressiveImage>
                </div>
              </Link>
              <p className="name-of-teams">{opponents[1].opponent.name}</p>
            </div>
          </div>

          <div className="prev-game-mobile">
            <div className="row-team-name-gamewin">
              <div
                className={
                  results[0].score < results[1].score
                    ? "match-loser"
                    : "match-winner"
                }
              >
                <ProgressiveImage
                  src={
                    opponents[0].opponent.image_url === null
                      ? csgoLogoDefaultBlack
                      : opponents[0].opponent.image_url
                  }
                  placeholder={csgoLogoDefaultBlack}
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
                className={
                  results[0].score < results[1].score
                    ? "match-loser"
                    : "match-winner"
                }
                style={{
                  backgroundColor:
                    results[0].score > results[1].score &&
                    colorTeamA.DarkVibrant,
                  color: results[0].score > results[1].score && "white",
                }}
              >
                {opponents[0].opponent.name}
              </p>
              <p
                className={
                  results[0].score < results[1].score
                    ? "match-loser point-A"
                    : "match-winner point-A"
                }
              >
                {results[0].score}
              </p>
            </div>

            <div className="row-team-name-gamewin">
              <div
                className={
                  results[0].score < results[1].score
                    ? "match-winner"
                    : "match-loser"
                }
              >
                <ProgressiveImage
                  src={
                    opponents[1].opponent.image_url === null
                      ? csgoLogoDefaultBlack
                      : opponents[1].opponent.image_url
                  }
                  placeholder={csgoLogoDefaultBlack}
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
                className={
                  results[0].score < results[1].score
                    ? "match-winner"
                    : "match-loser"
                }
                style={{
                  backgroundColor:
                    results[0].score < results[1].score &&
                    colorTeamB.DarkVibrant,
                  color: results[0].score < results[1].score && "white",
                }}
              >
                {opponents[1].opponent.name}
              </p>
              <p
                className={
                  results[0].score < results[1].score
                    ? "match-winner point-B"
                    : "match-loser point-B"
                }
              >
                {results[1].score}
              </p>
            </div>

            <div className="text-in-card">
              <p className="bestof-prev-game" style={{ color: palette.DarkMuted }}>
                {bestOf}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          content ? setContent(false) : setContent(true);
          id === firstIndex && playerScore();
        }}
        className="sort-content"
      >
        <FontAwesomeIcon icon={!content ? faSortDown : faSortUp} />
      </div>

      {content && (
        <Fragment>
          {id === firstIndex ? (
            <Fragment>
              <PlayerScore
                playerscore={playerscore}
                opponents={opponents}
                csgoLogoDefaultBlack={csgoLogoDefaultBlack}
                loading={loading}
                team0={opponents[0].opponent}
                team1={opponents[1].opponent}
              />
              <p className="info-not-first-index">
                <span
                  className="label-data-style"
                  style={{ color: palette.DarkVibrant }}
                >
                  <FontAwesomeIcon icon={faTrophy} />
                </span>
                <span className="align-end">
                  {league.name + " " + serie.full_name}
                </span>
              </p>
              <p className="info-not-first-index">
                <span
                  className="label-data-style"
                  style={{ color: palette.DarkVibrant }}
                >
                  <FontAwesomeIcon icon={faCalendarDay} />{" "}
                </span>
                <span>
                  {Moment(begin_at).format("Do")}{" "}
                  {Moment(begin_at).format("MMMM - H:mm")} hs
                </span>
              </p>
              <div className="prevgame-share">
                <Share Facebook={Facebook} Twitter={Twitter} Wapp={Wapp} />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="info-not-first-index">
                <span
                  className="label-data-style"
                  style={{ color: palette.DarkVibrant }}
                >
                  <FontAwesomeIcon icon={faTrophy} />
                </span>
                <span className="align-end">
                  {league.name + " " + serie.full_name}
                </span>
              </div>

              <div className="info-not-first-index">
                <span
                  className="label-data-style"
                  style={{ color: palette.DarkVibrant }}
                >
                  <FontAwesomeIcon icon={faCalendarDay} />{" "}
                </span>
                <span>
                  {Moment(begin_at).format("Do")}{" "}
                  {Moment(begin_at).format("MMMM - H:mm")} hs
                </span>
              </div>
              <div className="prevgame-share">
                <Share Facebook={Facebook} Twitter={Twitter} Wapp={Wapp} />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};
export default HistoricMatchCard;
