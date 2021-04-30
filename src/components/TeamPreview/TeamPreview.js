import React, { useContext, useState } from "react";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TeamRankingContext } from "../Context/TeamRankingContext";
import StadisticCard from "../StadisticCard/StadisticCard";
import ProgressiveImage from "react-progressive-image";
import csgoLogoDefaultBlack from "../../Images/csgoLogoDefaultBlack.png";
import twitter from "../../Images/twitter.png";
import instagram from "../../Images/insta.png";
import twitch from "../../Images/twitch.png";
import toBeDefined from "../../Images/toBeDefined.png";
import unknown from "../../Images/unknown.png";
import Modal from "react-modal";
import axios from "axios";
import "./teampreview.css";

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
  Modal.setAppElement("html");
  const { ranking } = useContext(TeamRankingContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [playerinfo, setPlayerInfo] = useState([]);
  const NEXTMATCH = matches[0];
  const LASTMATCH = prevMatch[0];
  const arrayTeam = LASTMATCH.opponents.find(
    (element) => element.opponent.id === parseInt(teamid)
  );
  const rankingTeam = ranking.find(
    (element) =>
      element.name.toLowerCase() === arrayTeam.opponent.name.toLowerCase()
  );
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      filter: `drop-shadow(0px 0px 1000px ${color.vibrant})`,
      color: color.darkVibrant,
    },
  };
  const getPlayerInfo = (playerName, LASTNAME) => {
    playerinfo.name !== playerName && setPlayerInfo([]);
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    };
    try {
      axios
        .get(
          `https://arg-matchez-backend.herokuapp.com/api/playerinfo/${playerName}`,
          config
        )
        .then(({ data }) => {
          data.name.includes(LASTNAME)
            ? setPlayerInfo(data)
            : setPlayerInfo(false);
        });
    } catch (error) {
      setPlayerInfo(false);
      setIsOpen(false);
    }
  };
  //https://www.countryflags.io//flat/24.png

  return (
    <div className="preview-container font-gilroy" id="preview">
      <StadisticCard winRate={winRate} winStrike={winStrike} wl={wl} />

      <div className="little-info">
        <div className="last-match">
          <span>Last Game</span>
          <div>
            <div className="team">
              <img
                src={
                  LASTMATCH.opponents[0].opponent.image_url === null
                    ? csgoLogoDefaultBlack
                    : LASTMATCH.opponents[0].opponent.image_url
                }
              />
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
                  color.vibrant,
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
                  color.vibrant,
              }}
            >
              {LASTMATCH.results[1].score}
            </span>

            <div className="team">
              <img
                src={
                  LASTMATCH.opponents[1].opponent.image_url === null
                    ? csgoLogoDefaultBlack
                    : LASTMATCH.opponents[1].opponent.image_url
                }
              />
              <span>{LASTMATCH.opponents[1].opponent.name}</span>
            </div>
          </div>
          <FontAwesomeIcon
            onClick={() => {
              window.scrollTo(0, 0);
              setHistory();
            }}
            className="font-size-18px cursor-pointer"
            style={{ color: color.darkVibrant }}
            icon={faInfoCircle}
          />
        </div>

        <div className="next-match">
          {NEXTMATCH ? (
            <>
              <span>
                Next Game{" "}
                {NEXTMATCH.status === "running" && (
                  <span>
                    Live<span className="dot-indicator"></span>
                  </span>
                )}
              </span>
              <div>
                <div className="team">
                  <img
                    src={
                      NEXTMATCH.opponents[0].opponent.image_url === null
                        ? csgoLogoDefaultBlack
                        : NEXTMATCH.opponents[0].opponent.image_url
                    }
                  />
                  <span>{NEXTMATCH.opponents[0].opponent.name}</span>
                </div>
                <span>vs</span>
                <div className="team">
                  <img
                    src={
                      NEXTMATCH.opponents.length > 1
                        ? NEXTMATCH.opponents[1].opponent.image_url === null
                          ? csgoLogoDefaultBlack
                          : NEXTMATCH.opponents[1].opponent.image_url
                        : toBeDefined
                    }
                  />
                  <span>
                    {NEXTMATCH.opponents.length > 1
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
                style={{ color: color.darkVibrant }}
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

      <div
        style={{ color: color.vibrant, backgroundColor: color.darkVibrant }}
        className="place-in-world"
      >
        {rankingTeam
          ? `${arrayTeam.opponent.name} #${rankingTeam.position} in the world`
          : `${arrayTeam.opponent.name}`}
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FontAwesomeIcon
          onClick={() => {
            setIsOpen(false);
          }}
          className="font-size-18px cursor-pointer"
          icon={faTimes}
        />
        {playerinfo.length !== 0 ? (
          playerinfo !== false ? (
            <>
              <h2>{playerinfo.ign && playerinfo.ign}</h2>
              <div className="player-canvas">
                <img
                  className="player-pic"
                  src={playerinfo.image && playerinfo.image}
                />
                <img className="background-team-logo" src={img} />
              </div>
              <h3>{playerinfo.name && playerinfo.name}</h3>

              <h4>{playerinfo.age && playerinfo.age} Years old</h4>
              <h4 className="place">
                {playerinfo.country.name && playerinfo.country.name}
                <img
                  title={playerinfo.country.name && playerinfo.country.name}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${
                    playerinfo.country.code && playerinfo.country.code
                  }.svg`}
                />
              </h4>
              <h5 className="social-media">
                {playerinfo.instagram && (
                  <a
                    href={playerinfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img title="instagram" src={instagram} />
                  </a>
                )}
                {playerinfo.twitch && (
                  <a
                    href={playerinfo.twitch}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img title="twitch" src={twitch} />
                  </a>
                )}
                {playerinfo.twitter && (
                  <a
                    href={playerinfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img title="twitter" src={twitter} />
                  </a>
                )}
              </h5>
            </>
          ) : (
            <>
              <h2>?</h2>
              <div className="player-canvas">
                <img className="player-pic" src={unknown} />
                <img className="background-team-logo" src={img} />
              </div>
            </>
          )
        ) : (
          <h2>
            <div class="preloader-wrapper small active">
              <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div>
                <div class="gap-patch">
                  <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </h2>
        )}
      </Modal>

      <div className="team">
        {roster.map((player) => {
          const {
            nationality,
            name,
            first_name,
            last_name,
            image_url,
          } = player;
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
                style={{ color: color.darkVibrant }}
                title={first_name + " " + last_name}
                className="font-gilroy-bold"
              >
                {name}
              </span>
              <span
                style={{ color: color.darkVibrant }}
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
