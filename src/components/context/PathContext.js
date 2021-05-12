import React, { createContext, useState } from "react";
import axios from "axios";


export const PathContext = createContext();

const PathProvider = (props) => {
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
    <PathContext.Provider value={{ teams, getTeams }}>
      {props.children}
    </PathContext.Provider>
  );
};

export default PathProvider;
