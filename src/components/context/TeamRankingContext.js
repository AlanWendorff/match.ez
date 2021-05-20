import React, { createContext, useState, useEffect } from "react";
import { HLTV_RANKING } from "../../const/ApiEndpoints";
import axios from "axios";
export const TeamRankingContext = createContext();

const TeamRankingProvider = (props) => {
  const [ranking, setRanking] = useState([]);
  const badfetch = false;

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.get(HLTV_RANKING, config).then(({ data }) => {
      setRanking(data);
    });
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
