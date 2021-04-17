import React, { useState, useEffect, useContext } from "react";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import { PathContext } from "../Context/PathContext";
import { getRanking } from "./getHltvRanking";
import LazyLoad from "react-lazyload";
import Team from "./Team";
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
          console.log({ team, databaseTeam });
          const { balance, name, points, position, roster } = team;
          const img = databaseTeam && databaseTeam.img;
          const id = databaseTeam && databaseTeam.id;

          let balanceColor;
          balance.length > 1
            ? balance.includes("-")
              ? (balanceColor = "color-text-red")
              : (balanceColor = "color-text-green")
            : (balanceColor = "color-text-black");

          return (
            <LazyLoad offset={80} height={80} overflow key={name}>
              <Team
                balanceColor={balanceColor}
                id={id}
                img={img}
                balance={balance}
                name={name}
                points={points}
                position={position}
                roster={roster}
              />
            </LazyLoad>
          );
        })}
      </div>
    </div>
  ) : (
    <SimpleLoadScreen />
  );
};

export default HltvRanking;
