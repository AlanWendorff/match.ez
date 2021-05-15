import React, { useContext } from "react";
import { TeamRankingContext } from "../Context/TeamRankingContext";
const TeamRanking = ({ name }) => {
  const { ranking } = useContext(TeamRankingContext);
  const rankedTeam = ranking.find(
    (element) => element.name.toLowerCase() === name.toLowerCase()
  );
  return (
    <div
      title={
        rankedTeam
          ? `${rankedTeam.name} Top ${rankedTeam.position} of the World`
          : `This team is not ranked`
      }
      className={`mini-ranking color-text-black font-size ${
        rankedTeam ? "font-gilroy-bold" : "font-gilroy"
      }`}
    >
      {rankedTeam ? `# ${rankedTeam.position}` : "# ?"}
    </div>
  );
};

export default TeamRanking;
