import React, { useContext } from "react";
import { TeamRankingContext } from "../Context/TeamRankingContext";
import Loader from "../Loader/Loader";
import LazyLoad from "react-lazyload";
import Team from "./Team";
import "./HltvRanking.css";

const HltvRanking = () => {
    const { ranking } = useContext(TeamRankingContext);

    return ranking.length !== 0 ? (
        <div className="ranking-container font-gilroy background-color-4all">
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
        </div>
    ) : (
        <Loader />
    );
};

export default HltvRanking;
