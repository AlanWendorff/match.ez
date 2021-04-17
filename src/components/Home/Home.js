import React, { useState, useContext } from "react";
import SearchTeam from "../SearchTeam/SearchTeam";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import TeamCollection from "../TeamCollection/TeamCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faListOl } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { RANKING } from "../../routes/routes";
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
        <Link to={RANKING} title="Look ranking" style={{ backgroundColor: colors.header_color }}>
          <FontAwesomeIcon icon={faListOl} /> 
          World Ranking
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
        <SearchTeam setCollection={setCollection} collection={collection} />
        <TeamCollection collection={collection} />
        
      </div>
    </div>
  ) : (
    <SimpleLoadScreen />
  );
};

export default Home;
