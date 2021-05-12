import React, { createContext, useState } from "react";
import axios from "axios";

export const TournamentContext = createContext();

const TournamentProvider = (props) => {
  const [tournamentsdatabase, guardarTournamentsDatabase] = useState([]);

  const getTournamentsFromDatabase = () => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios("https://arg-matchez-backend.herokuapp.com/database/tournaments", config).then(({ data }) => {
      guardarTournamentsDatabase(data);
    });
  };

  return (
    <TournamentContext.Provider
      value={{ tournamentsdatabase, getTournamentsFromDatabase }}
    >
      {props.children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;
