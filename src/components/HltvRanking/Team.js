import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TEAM, RANKING } from "../../routes/routes";
import ProgressiveImage from "react-progressive-image";
import csgoLogoBlack from "../../Images/csgoLogoDefaultBlack.png";
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

  return (
    <Link
      key={name}
      to={id ? TEAM.replace(":teamid", id) : RANKING}
      title={`Look the team profile of: ${name}`}
      className="animate__animated animate__faster animate__fadeInUp"
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
            <ProgressiveImage src={img ? img : csgoLogoBlack} placeholder={csgoLogoBlack}>
              {(src) => (
                <img className="" loading="lazy" src={src} alt={name} />
              )}
            </ProgressiveImage>
          </div>
        </div>
        <div className="name">
          <span>{name}</span>
          <span>{points} Points</span>
        </div>
        <div className="roster">
          {roster.map((player) => (
            <span key={player}>{player}</span>
          ))}
        </div>
        <span className={balanceColor}>{balance}</span>
      </div>
    </Link>
  );
};

export default Team;
