import React, { useContext, useState } from "react";
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
import { useHistory } from "react-router";
import { TEAM, ERROR } from "../../routes/routes";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";
import PlayerScore from "../PlayerScore/PlayerScore";
import Share from "../Share/Share";
import Moment from "moment";
import nopic from "../../Images/nopic.png";
import loader from "../../Images/loader.gif";
import "../CompetitionCard/tarjetaMatchesCompletos.css";
import "./matchprevio.css";

const HistoricMatchCard = ({
  match,
  teamId,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(false);
  const [showscore, setShowScore] = useState(0);
  const [playerscore, setPlayerScore] = useState([]);
  const {
    detailed_stats,
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
  let colorTeamA;
  let colorTeamB;
  
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
    setLoading(true);
    const gameScore = await getPlayerScore(id);
    gameScore.status !== 200 && history.push(ERROR);
    setLoading(false);
    setPlayerScore(gameScore.data);
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

          <div className="prev-game-mobile">
            <div className="row-team" 
              onClick={() => {history.push(TEAM.replace(':teamid', opponents[0].opponent.id))}}
              style={
                {
                  borderLeft: results[1].score < results[0].score && `5px solid ${opponents[0].opponent.colors.DarkVibrant}`,
                  borderRight:  results[1].score < results[0].score && `5px solid ${opponents[0].opponent.colors.DarkVibrant}`
                }
                }>
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
                      ? nopic
                      : opponents[0].opponent.image_url
                  }
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
                    ? "match-loser point-A font-gilroy-bold"
                    : "match-winner point-A font-gilroy-bold"
                }
              >
                {results[0].score}
              </p>
            </div>

            <div className="row-team" 
              onClick={() => {history.push(TEAM.replace(':teamid', opponents[1].opponent.id))}}
              style={
                {
                  borderLeft:  results[0].score < results[1].score && `5px solid ${opponents[1].opponent.colors.DarkVibrant}`,
                  borderRight:  results[0].score < results[1].score && `5px solid ${opponents[1].opponent.colors.DarkVibrant}`
                }} >
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
                      ? nopic
                      : opponents[1].opponent.image_url
                  }
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
                    ? "match-winner point-B font-gilroy-bold"
                    : "match-loser point-B font-gilroy-bold"
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
      <div onClick={() => {content ? setContent(false) : setContent(true);}} className="sort-content">
        <FontAwesomeIcon icon={!content ? faSortDown : faSortUp} />
      </div>
     
      {content && (
        <>  
          {
            detailed_stats === true ?
              showscore === 0 ?
                <div className="player-stats-btn highlight-text" onClick={()=> {playerScore(); setShowScore(1);}}>
                  View Player Stats
                </div>
                :
                <PlayerScore
                  playerscore={playerscore}
                  opponents={opponents}
                  nopic={nopic}
                  loading={loading}
                  team0={opponents[0].opponent}
                  team1={opponents[1].opponent}
                />
              :
              <div className="no-stadistic">No player stadistics for this serie :'(</div>
          }
          
          <p className="info-container">
            <span
              className="label-data-style"
              style={{ color: palette.DarkVibrant }}
            >
              <FontAwesomeIcon icon={faTrophy} />
            </span>
            <span className="text-align-end">
              {league.name + " " + serie.full_name}
            </span>
          </p>
          <p className="info-container">
            <span
              className="label-data-style"
              style={{ color: palette.DarkVibrant }}
            >
              <FontAwesomeIcon icon={faCalendarDay} />{" "}
            </span>
            <span className="text-align-end">
              {Moment(begin_at).format("Do")}{" "}
              {Moment(begin_at).format("MMMM - H:mm")} hs
            </span>
          </p>
          <div className="row-card-share">
            <Share Facebook={Facebook} Twitter={Twitter} Wapp={Wapp} />
          </div>
        </>
      )}
    </div>
  );
};
export default HistoricMatchCard;
