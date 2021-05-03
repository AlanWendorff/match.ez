import React, { createContext, useState } from "react";
import firebase from "../../utility/FirebaseConfig";

const database = firebase.database();

export const PathContext = createContext();

const PathProvider = (props) => {
  const [paths, guardarPath] = useState([]);

  const getTeams = () => {
    database.ref("paths").on("value", (snap) => {
      guardarPath(snap.val());
    });
  };

  return (
    <PathContext.Provider value={{ paths, getTeams }}>
      {props.children}
    </PathContext.Provider>
  );
};

export default PathProvider;
