import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { TEAM, RANKING } from "../../routes/routes";
import { LOOKPROFILE } from "../../titles/TitleTag";
import { PLAYER_INFO } from "../../constants/ApiEndpoints";
import ProgressiveImage from "react-progressive-image";
import LoaderGif from "../../assets/images/placeholder/loader.gif";
import Loader from "../Loader/Loader";
import axios from "axios";
import "./HltvRanking.css";

const nopic = React.lazy(() => import("../../assets/images/placeholder/nopic.png"));
const PlayerModal = React.lazy(() => import("../PlayerModal/PlayerModal"));

const Team = ({
  balanceColor,
  id,
  img,
  balance,
  name,
  points,
  position,
  roster,
  colors,
}) => {
  const [playerinfo, setPlayerInfo] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const getPlayerInfo = (player) => {
    const playerIGN = player.replace(" ", "");
    playerinfo.ign !== playerIGN && setPlayerInfo([]);
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    axios
      .get(PLAYER_INFO.replace(":name", playerIGN), config)
      .then(({ data }) => {
        setPlayerInfo(data);
      });
  };
  return (
    <div
      key={name}
      className="animate__faster animate__fadeInUp animate__animated"
    >
      <div style={{ backgroundColor: colors.DarkVibrant }}>
        <Suspense fallback={<Loader transparent />}>
          <PlayerModal
            playerinfo={playerinfo}
            color={colors}
            setIsOpen={setIsOpen}
            modalIsOpen={modalIsOpen}
            img={img}
          />
        </Suspense>
        <Link
          className="team"
          to={id ? TEAM.replace(":teamid", id) : RANKING}
          title={`Look the team profile of: ${name}`}
        >
          <span className="color-text-white">#{position}</span>
          <div>
            <ProgressiveImage
              src={img !== undefined ? img : nopic}
              placeholder={LoaderGif}
            >
              {(src) => <img src={src} alt={name} />}
            </ProgressiveImage>
          </div>
        </Link>
        <Link
          className="name"
          to={id ? TEAM.replace(":teamid", id) : RANKING}
          title={`Look the team profile of: ${name}`}
        >
          <span>{name}</span>
          <span className="display-flex">
            {points} Points <span className={balanceColor}>{balance}</span>
          </span>
        </Link>
        <div className="roster">
          {roster.map((player) => (
            <span
              title={LOOKPROFILE + player}
              onClick={() => {
                setIsOpen(true);
                getPlayerInfo(player);
              }}
              key={player}
            >
              {player}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
