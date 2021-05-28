import React from "react";
import ProgressiveImage from "react-progressive-image";
import loader from '../../Images/loader.gif';
import nopic from '../../Images/nopic.png';
import { LOOKMATCHES } from "../../titlestag/titlestag";
import { TOURNAMENT } from "../../routes/routes";
import { Link } from "react-router-dom";
import "./tournaments.css";

const Item = ({ tournament }) => {
  let img;
  let name;
  img = tournament.img;
  name = tournament.name;
  return (
    <Link
      style={{ backgroundColor: tournament.colors.DarkVibrant }}
      to={TOURNAMENT.replace(":tournamentId", tournament.id)}
      className={`tournament-size z-depth-5 animate__fadeInDown animate__faster ${
        JSON.parse(localStorage.getItem("animations")) !== false &&
        "animate__animated"
      }`}
      title={`${LOOKMATCHES} ${tournament.name}`}
      key={tournament.id}
    >
      <div className="tournament-flex">
        <div>
          <ProgressiveImage src={img === undefined ? nopic : img } placeholder={loader}>
            {(src) => (
              <img className="tournament-logo-size" src={src} alt={name} />
            )}
          </ProgressiveImage>
        </div>
        <span className="tournament-name">{name}</span>
      </div>
    </Link>
  );
};

export default Item;
