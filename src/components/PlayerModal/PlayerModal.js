import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import twitter from "../../Images/twitter.png";
import instagram from "../../Images/insta.png";
import twitch from "../../Images/twitch.png";
import unknown from "../../Images/unknown.png";
import "./playermodal.css";

const PlayerModal = ({ playerinfo, color, setIsOpen, modalIsOpen, img }) => {
  Modal.setAppElement("html");

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

  return (
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
            <h6
              className="player-stadistics"
              style={{ border: `2px solid ${color.darkVibrant}` }}
            >
              <div>
                <span>Headshots</span>
                <span>Maps Played</span>
                <span>Rating</span>
              </div>

              <div>
                <span>{playerinfo.statistics.headshots}</span>
                <span>{playerinfo.statistics.mapsPlayed}</span>
                <span>{playerinfo.statistics.rating}</span>
              </div>
            </h6>
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
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </h2>
      )}
    </Modal>
  );
};

export default PlayerModal;
