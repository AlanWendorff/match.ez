import React, { createContext, useState, useEffect } from "react";
import firebase from "../../utility/FirebaseConfig";
import { getRanking } from "../HltvRanking/getHltvRanking";

const database = firebase.database();
export const TeamRankingContext = createContext();

const TeamRankingProvider = (props) => {
  const [ranking, setRanking] = useState([]);
  const [badfetch, setBadFetch] = useState(false);
  useEffect(() => {
    database
      .ref("HLTV_RANKING")
      .child(0)
      .on("value", (snap) => {
        if (snap.val() === null) {
          setBadFetch(true);
        }
      });
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
