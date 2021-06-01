import React, { useContext, useState, Suspense } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TeamRankingContext } from "../Context/TeamRankingContext";
import { PLAYER_INFO } from "../../const/ApiEndpoints";
import StadisticCard from "../StadisticCard/StadisticCard";
import ProgressiveImage from "react-progressive-image";
import loader from "../../Images/loader.gif";
import nopic from "../../Images/nopic.png";
import toBeDefined from "../../Images/toBeDefined.png";
import unknown from "../../Images/unknown.png";
import axios from "axios";
import "./teampreview.css";

const PlayerModal = React.lazy(() => import("../PlayerModal/PlayerModal"));

const TeamPreview = ({
  teamid,
  color,
  matches,
  prevMatch,
  setVs,
  setHistory,
  roster,
  winRate,
  winStrike,
  wl,
  img,
}) => {
  const { ranking } = useContext(TeamRankingContext);
  const [playerinfo, setPlayerInfo] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const NEXTMATCH = matches[0];
  const LASTMATCH = prevMatch[0];
  const arrayTeam =
    prevMatch !== "no-match" &&
    LASTMATCH.opponents.find(
      (element) => element.opponent.id === parseInt(teamid)
    );
  const rankingTeam =
    prevMatch !== "no-match" &&
    ranking.find(
      (element) =>
        element.name.toLowerCase() === arrayTeam.opponent.name.toLowerCase()
    );

  const getPlayerInfo = (playerName, LASTNAME) => {
    playerinfo.name !== playerName && setPlayerInfo([]);
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    axios
      .get(PLAYER_INFO.replace(":name", playerName), config)
      .then(({ data }) => {
        data.name.includes(LASTNAME)
          ? setPlayerInfo(data)
          : setPlayerInfo(false);
      });
  };

  return (
    <div className="preview-container font-gilroy" id="preview">
      <StadisticCard winRate={winRate} winStrike={winStrike} wl={wl} />

      <div className="little-info">
        <div className="last-match">
          {prevMatch !== "no-match" ? (
            <>
              <span>Last Game</span>
              <div>
                <div className="team">
                  <ProgressiveImage
                    src={
                      !LASTMATCH.opponents[0].opponent.image_url
                        ? nopic
                        : LASTMATCH.opponents[0].opponent.image_url
                    }
                    placeholder={loader}
                  >
                    {(src) => <img src={src} alt="team A" />}
                  </ProgressiveImage>
                  <span>{LASTMATCH.opponents[0].opponent.name}</span>
                </div>

                <span
                  className={
                    LASTMATCH.results[0].score > LASTMATCH.results[1].score
                      ? "winner-dot"
                      : ""
                  }
                  style={{
                    backgroundColor:
                      LASTMATCH.results[0].score > LASTMATCH.results[1].score &&
                      LASTMATCH.opponents[0].opponent.colors.DarkVibrant,
                  }}
                >
                  {LASTMATCH.results[0].score}
                </span>

                <span>-</span>

                <span
                  className={
                    LASTMATCH.results[0].score < LASTMATCH.results[1].score
                      ? "winner-dot"
                      : ""
                  }
                  style={{
                    backgroundColor:
                      LASTMATCH.results[0].score < LASTMATCH.results[1].score &&
                      LASTMATCH.opponents[1].opponent.colors.DarkVibrant,
                  }}
                >
                  {LASTMATCH.results[1].score}
                </span>

                <div className="team">
                  <ProgressiveImage
                    src={
                      !LASTMATCH.opponents[1].opponent.image_url
                        ? nopic
                        : LASTMATCH.opponents[1].opponent.image_url
                    }
                    placeholder={loader}
                  >
                    {(src) => <img src={src} alt="team B" />}
                  </ProgressiveImage>
                  <span>{LASTMATCH.opponents[1].opponent.name}</span>
                </div>
              </div>
              <FontAwesomeIcon
                onClick={() => {
                  window.scrollTo(0, 0);
                  setHistory();
                }}
                className="font-size-18px cursor-pointer"
                style={{ color: color.DarkVibrant }}
                icon={faInfoCircle}
              />
            </>
          ) : (
            <div>
              <span>NO PAST MATCH</span>
            </div>
          )}
        </div>

        <div className="next-match">
          {NEXTMATCH ? (
            <>
              <span>
                Next Game{" "}
                {NEXTMATCH.status === "running" && (
                  <span>
                    <span>Live</span> <span className="dot-indicator"></span>
                  </span>
                )}
              </span>
              <div>
                <div className="team">
                  <ProgressiveImage
                    src={
                      NEXTMATCH.opponents[0] !== false
                        ? !NEXTMATCH.opponents[0].opponent.image_url
                          ? nopic
                          : NEXTMATCH.opponents[0].opponent.image_url
                        : toBeDefined
                    }
                    placeholder={loader}
                  >
                    {(src) => <img src={src} alt="team A Next Match" />}
                  </ProgressiveImage>
                  <span>
                    {NEXTMATCH.opponents[0] !== false
                      ? NEXTMATCH.opponents[0].opponent.name
                      : "To be Defined"}
                  </span>
                </div>
                <span>vs</span>
                <div className="team">
                  <ProgressiveImage
                    src={
                      NEXTMATCH.opponents[1] !== false
                        ? !NEXTMATCH.opponents[1].opponent.image_url
                          ? nopic
                          : NEXTMATCH.opponents[1].opponent.image_url
                        : toBeDefined
                    }
                    placeholder={loader}
                  >
                    {(src) => <img src={src} alt="team B Next Match" />}
                  </ProgressiveImage>

                  <span>
                    {NEXTMATCH.opponents[1] !== false
                      ? NEXTMATCH.opponents[1].opponent.name
                      : "To be Defined"}
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                onClick={() => {
                  window.scrollTo(0, 0);
                  setVs();
                }}
                className="font-size-18px cursor-pointer"
                style={{ color: color.DarkVibrant }}
                icon={faInfoCircle}
              />
            </>
          ) : (
            <div>
              <span>NO UPCOMING MATCH</span>
            </div>
          )}
        </div>
      </div>

      <Suspense fallback={<div></div>}>
        <PlayerModal
          playerinfo={playerinfo}
          color={color}
          setIsOpen={setIsOpen}
          modalIsOpen={modalIsOpen}
          img={img}
        />
      </Suspense>

      <div
        style={{ color: color.Vibrant }}
        className="place-in-world background-color-transparent"
      >
        {rankingTeam
          ? `${prevMatch !== "no-match" && arrayTeam.opponent.name} #${
              rankingTeam.position
            } in the world`
          : `${prevMatch !== "no-match" && arrayTeam.opponent.name}`}
      </div>

      <div className="team">
        {roster.map((player) => {
          const { nationality, name, first_name, last_name, image_url } =
            player;
          const FIRSTNAME = first_name !== null ? first_name : "";
          const LASTNAME = last_name !== null ? last_name : "";
          const NATIONALITY =
            nationality !== null
              ? `http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`
              : undefined;
          return (
            <div
              className="player"
              key={name}
              onClick={() => {
                setIsOpen(true);
                getPlayerInfo(name, LASTNAME);
              }}
            >
              <div>
                <ProgressiveImage
                  src={image_url === null ? unknown : image_url}
                  placeholder={unknown}
                >
                  {(src) => (
                    <img
                      title={first_name + " " + last_name}
                      className="player-image"
                      loading="lazy"
                      src={src}
                      alt={name}
                    />
                  )}
                </ProgressiveImage>
              </div>
              <img title={nationality} src={NATIONALITY} />
              <span
                style={{ color: color.DarkVibrant }}
                title={first_name + " " + last_name}
                className="font-gilroy-bold"
              >
                {name}
              </span>
              <span
                style={{ color: color.DarkVibrant }}
                className="player-name-style"
              >
                {FIRSTNAME + " " + LASTNAME}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPreview;
