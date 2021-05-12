import React, { createContext, useState, useEffect } from "react";
import { getRanking } from "../HltvRanking/getHltvRanking";

export const TeamRankingContext = createContext();

const TeamRankingProvider = (props) => {
  const [ranking, setRanking] = useState([]);
  const [badfetch, setBadFetch] = useState(false);

  useEffect(() => {
    (async () => {
      const { objRanking, badFetch } = await getRanking();
      setRanking(objRanking);
    })();
  }, []);
  
  return (
    <TeamRankingContext.Provider
      value={{
        ranking,
        badfetch,
      }}
    >
      {props.children}
    </TeamRankingContext.Provider>
  );
};

export default TeamRankingProvider;
