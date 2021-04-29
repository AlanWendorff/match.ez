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
  const { tournamentsdatabase, getTournamentsFromDatabase } = useContext(TournamentContext);
  const [tournaments, setTournaments] = useState([]);
  const objectToArray = tournamentsdatabase.length !== 0 && Object.values(tournamentsdatabase).slice(0, 6);

  const loadMoreItems = () => {
    let arrayLimit =
      tournaments.length === 6
        ? Math.round(Object.values(tournamentsdatabase).length / 2)
        : Object.values(tournamentsdatabase).length;
    setTournaments(Object.values(tournamentsdatabase).slice(0, arrayLimit));
  };

  useEffect(() => {
    tournamentsdatabase.length === 0 && getTournamentsFromDatabase();
    setTournaments(objectToArray);
  }, [tournamentsdatabase]);

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
      {tournaments.length !== Object.values(tournamentsdatabase).length && (
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
