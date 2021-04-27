import React, { useState, useContext } from "react";
import SearchTeam from "../SearchTeam/SearchTeam";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import TeamCollection from "../TeamCollection/TeamCollection";
import "./home.css";

const Home = () => {
  const { colors } = useContext(ColorThemeContext);
  const [collection, setCollection] = useState([]);

  return colors.background_color !== undefined ? (
    <div
      className="home font-gilroy"
      style={{ backgroundColor: colors.background_color }}
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <div className="child-home">
        <SearchTeam setCollection={setCollection} collection={collection} />
        <TeamCollection collection={collection} />
      </div>
    </div>
  ) : (
    <SimpleLoadScreen />
  );
};

export default Home;
