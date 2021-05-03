import React, { createContext, useState } from "react";
import firebase from "../../utility/FirebaseConfig";

const database = firebase.database();

export const TournamentContext = createContext();

const TournamentProvider = (props) => {
  const [tournamentsdatabase, guardarTournamentsDatabase] = useState([]);

  const getTournamentsFromDatabase = () => {
    database.ref("tournament").on("value", (snap) => {
        guardarTournamentsDatabase(snap.val());
    });
  };

  return (
    <TournamentContext.Provider value={{ tournamentsdatabase, getTournamentsFromDatabase }}>
      {props.children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;
