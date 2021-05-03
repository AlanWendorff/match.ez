import React, { useState } from "react";
import { Link } from "react-router-dom";
import { examplesAmerica, examplesnotAmerica, examplesnull } from "./Teams";
import ProgressiveImage from "react-progressive-image";
import csgoLogo from "../../Images/csgoLogoDefault.png";
import { TEAM } from "../../routes/routes";
import "./teamcollection.css";

const TeamCollection = ({ collection }) => {
  const [examples, setExamples] = useState(examplesnull);

  navigator.geolocation.getCurrentPosition(function (position) {
    if (
      (position.coords.longitude < 0 && position.coords.latitude < 0) ||
      (position.coords.longitude > 0 && position.coords.latitude < 0)
    ) {
      setExamples(examplesAmerica);
    } else {
      setExamples(examplesnotAmerica);
    }
  });

  return (
    <div className={`collection-container animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>
      <span className="color-text-white font-bold">
        {collection.length > 0 ? "MY SHORTCUTS" : "SOME TEAMS"}
      </span>
      <div className="teams-position mb-30px">
        {collection.length > 0
          ? collection.map((team) => (
              <Link
                key={team.name}
                to={TEAM.replace(":teamid", team.id)}
                title={`Look the team profile of: ${team.name}`}
              >
                <div className="crosshair-expand">
                  <div>
                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                      {(src) => (
                        <img
                          className=""
                          loading="lazy"
                          src={src}
                          alt={`${team.name}`}
                        />
                      )}
                    </ProgressiveImage>
                  </div>
                  <span>{team.name}</span>
                </div>
              </Link>
            ))
          : examples.map((team) => (
              <Link
                key={team.name}
                to={TEAM.replace(":teamid", team.id)}
                title={`Look the team profile of: ${team.name}`}
              >
                <div className="crosshair-expand">
                  <div>
                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                      {(src) => (
                        <img
                          className=""
                          loading="lazy"
                          src={src}
                          alt={`${team.name}`}
                        />
                      )}
                    </ProgressiveImage>
                  </div>
                  <span>{team.name}</span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
export default TeamCollection;
