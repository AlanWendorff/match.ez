import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TEAM } from "../../routes/routes";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import ProgressiveImage from "react-progressive-image";
import { PathContext } from "../Context/PathContext";
import { getRanking } from "./getHltvRanking";
import csgoLogo from "../../Images/csgoLogoDefault.png";
import "./hltvranking.css";
const HltvRanking = () => {
  const [badfetch, setBadFetch] = useState(false);
  const { colors } = useContext(ColorThemeContext);
  const [ranking, setRanking] = useState([]);
  const { paths } = useContext(PathContext);
  const pathsArray = Object.values(paths);

  useEffect(() => {
    (async () => {
      const { objRanking, badFetch } = await getRanking();
      setRanking(objRanking);
    })();
  }, []);

  return colors.background_color !== undefined ? (
    <div
      className="ranking-container font-gilroy"
      style={{ backgroundColor: colors.background_color }}
    >
      <div className="table-container animate__animated animate__faster animate__fadeInUp">
        {ranking.map((team) => {
          const databaseTeam = pathsArray.find(
            (element) => element.name.toLowerCase() === team.name.toLowerCase()
          );
          console.log({team, databaseTeam});
          const { balance, name, points, position, roster } = team;
          const img = databaseTeam && databaseTeam.img;
          const id = databaseTeam && databaseTeam.id;

          let balanceColor;
          balance.length > 1?
            balance.includes("-")?
              balanceColor = "color-text-red"
              :
              balanceColor = "color-text-green"
          :
          balanceColor = "color-text-white";
          
          return (
            <Link
              key={name}
              to={id ? TEAM.replace(":teamid", id) : "/"}
              title={`Look the team profile of: ${name}`}
            >
              <div className={position === 1? "crosshair-expand fire" : "crosshair-expand"}>
                <div className="team">
                  <span className="color-text-white">#{position}</span>
                  <div>
                    <ProgressiveImage
                      src={img ? img : csgoLogo}
                      placeholder={csgoLogo}
                    >
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
                    {
                      roster.map((player)=> (
                          <span>{player}</span>
                        ))
                    }
                </div>
                <span className={balanceColor}>{balance}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <SimpleLoadScreen />
  );
};

export default HltvRanking;
