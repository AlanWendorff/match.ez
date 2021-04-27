import React, { useContext, useState, useEffect } from "react";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import { TournamentContext } from "../Context/TournamentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import Item from "./Item";
import "./tournaments.css";

const Tournaments = () => {
  const { colors } = useContext(ColorThemeContext);
  const { tournamentId } = useContext(TournamentContext);
  const [tournaments, setTournaments] = useState([]);
  const objectToArray = Object.values(tournamentId).slice(0, 6);

  const loadMoreItems = () => {
    let arrayLimit =
      tournaments.length === 6
        ? Math.round(Object.values(tournamentId).length / 2)
        : Object.values(tournamentId).length;
    setTournaments(Object.values(tournamentId).slice(0, arrayLimit));
  };

  useEffect(() => {
    setTournaments(objectToArray);
  }, []);

  return colors.background_color !== undefined ? (
    <div
      className="tournament-container font-gilroy"
      style={{ backgroundColor: colors.background_color }}
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <div className="child-tournament">
        {tournaments.length > 0 &&
          tournaments.map((tournament) => (
            <Item tournament={tournament} key={tournament.id} />
          ))}
      </div>
      {tournaments.length !== Object.values(tournamentId).length && (
        <div
          onClick={() => {
            loadMoreItems();
          }}
          className="load-more"
        >
          <FontAwesomeIcon icon={faCaretSquareDown} /> Load More{" "}
          <FontAwesomeIcon icon={faCaretSquareDown} />{" "}
        </div>
      )}
    </div>
  ) : (
    <SimpleLoadScreen />
  );
};

export default Tournaments;
