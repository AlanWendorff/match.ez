import React, { useContext } from "react";
import { TeamRankingContext } from "../Context/TeamRankingContext";
import "./teamranking.css";
const TeamRanking = ({ name }) => {
  const { ranking, badfetch } = useContext(TeamRankingContext);
  const rankedTeam = ranking.find(
    (element) => element.name.toLowerCase() === name.toLowerCase()
  );
  return <div className="mini-ranking color-text-black font-gilroy-bold">{rankedTeam && `# ${rankedTeam.position}`}</div>;
};

export default TeamRanking;
