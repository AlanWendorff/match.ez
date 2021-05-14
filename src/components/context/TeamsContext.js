import React, { createContext, useState } from "react";
import axios from "axios";

export const TeamsContext = createContext();

const TeamsProvider = (props) => {
  const [teams, setTeams] = useState([]);

  const getTeams = () => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios("https://arg-matchez-backend.herokuapp.com/database/teams", config).then(({ data }) => {
      setTeams(data);
    });
  };

  return (
    <TeamsContext.Provider value={{ teams, getTeams }}>
      {props.children}
    </TeamsContext.Provider>
  );
};

export default TeamsProvider;
