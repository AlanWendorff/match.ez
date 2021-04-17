import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TEAM, RANKING } from "../../routes/routes";
import ProgressiveImage from "react-progressive-image";
import csgoLogo from "../../Images/csgoLogoDefault.png";
import { usePalette } from "react-palette";
import "./hltvranking.css";

const Team = ({
  balanceColor,
  id,
  img,
  balance,
  name,
  points,
  position,
  roster,
}) => {
  let colorTeam;
  colorTeam = usePalette("https://proxy-kremowy.herokuapp.com/" + img).data;

  console.log(colorTeam);
  return (
    <Link
      key={name}
      to={id ? TEAM.replace(":teamid", id) : RANKING}
      title={`Look the team profile of: ${name}`}
    >
      <div
        /* className={
          position === 1 ? "fire" : ""
        } */
        style={{ backgroundColor: colorTeam.darkVibrant }}
      >
        <div className="team">
          <span className="color-text-white">#{position}</span>
          <div>
            <ProgressiveImage src={img ? img : csgoLogo} placeholder={csgoLogo}>
              {(src) => (
                <img className="" loading="lazy" src={src} alt={name} />
              )}
            </ProgressiveImage>
          </div>
        </div>
        <div className="name">
          <span>{name}</span>
          <span>{points}</span>
        </div>
        <div className="roster">
          {roster.map((player) => (
            <span>{player}</span>
          ))}
        </div>
        <span className={balanceColor}>{balance}</span>
      </div>
    </Link>
  );
};

export default Team;
