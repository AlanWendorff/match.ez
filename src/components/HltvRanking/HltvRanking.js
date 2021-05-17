import React, { useContext, Suspense } from "react";
import { TeamRankingContext } from "../Context/TeamRankingContext";
import LoadScreen from "../Loader/LoadScreen";
import LazyLoad from "react-lazyload";
import Team from "./Team";
import "./hltvranking.css";
const Warning = React.lazy(() => import("../Warning/Warning"));

const HltvRanking = () => {
  const { ranking, badfetch } = useContext(TeamRankingContext);

  return !badfetch ? (
    <div className="ranking-container font-gilroy background-color-4all">
      {ranking.length > 0 ? (
        <div className="table-container">
          {ranking.map((team) => {
            const { balance, name, points, position, roster, img, id, colors } = team;
            let balanceColor;
            balance.length > 1
              ? balance.includes("-")
                ? (balanceColor = "color-text-red")
                : (balanceColor = "color-text-green")
              : (balanceColor = "color-text-black");

            return (
              <LazyLoad offset={80} height={80} overflow key={position}>
                <Team
                  colors={colors}
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
      ) : (
        <LoadScreen />
      )}
    </div>
  ) : (
    <div className="ranking-container font-gilroy background-color-4all">
      <Suspense fallback={<div></div>}><Warning /></Suspense>
    </div>
  );
};

export default HltvRanking;
