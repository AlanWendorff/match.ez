import React, { useState, useEffect } from "react";
import SearchTeam from "../SearchTeam/SearchTeam";
import TeamCollection from "../TeamCollection/TeamCollection";
import "./home.css";

const Home = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("collection")) === null) {
      localStorage.setItem("collection", JSON.stringify([]));
    }
    setCollection(JSON.parse(localStorage.getItem("collection")));
  }, []);

  return (
    <div
      className="home font-gilroy background-color-4all"
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <div className="child-home">
        <SearchTeam setCollection={setCollection} collection={collection} />
        <TeamCollection collection={collection} />
      </div>
    </div>
  );
};

export default Home;
