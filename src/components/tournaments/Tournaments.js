import React, { useContext, useState, useEffect } from "react";
import { TournamentContext } from "../Context/TournamentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchTournament from "../SearchTournament/SearchTournament";
import Item from "./Item";
import "./tournaments.css";

const Tournaments = () => {
  const { tournamentsdatabase, getTournamentsFromDatabase } = useContext(
    TournamentContext
  );
  const [tournaments, setTournaments] = useState([]);
  const tournamentsModed =
    tournamentsdatabase.length !== 0 &&
    tournamentsdatabase.slice(0, 6);

  const loadMoreItems = () => {
    let arrayLimit =
      tournaments.length === 6
        ? Math.round(tournamentsdatabase.length / 2)
        : tournamentsdatabase.length;
    setTournaments(tournamentsdatabase.slice(0, arrayLimit));
  };

  const FilterTournament = () => {
    let input = document.getElementById('last_name').value.toLowerCase();
    let filteredTournaments = [];
    tournamentsdatabase.map((tournament) => {
      if (tournament.name.toLowerCase().includes(input) && input !== "") {
        filteredTournaments.push(tournament);
      }
    });
    input === ""? setTournaments(tournamentsdatabase.slice(0, 6)) : setTournaments(filteredTournaments);
  };
 
  useEffect(() => {
    tournamentsdatabase.length === 0 && getTournamentsFromDatabase();
    setTournaments(tournamentsModed);
  }, [tournamentsdatabase]);

  return  (
    <div
      className="tournament-container font-gilroy background-color-4all"
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <SearchTournament FilterTournament={FilterTournament}/>
      <div className="child-tournament">
        {tournaments.length > 0 &&
          tournaments.map((tournament) => (
            <Item tournament={tournament} key={tournament.id} />
          ))}
      </div>
      {tournaments.length !== tournamentsdatabase.length && (
        <div
          onClick={() => {
            loadMoreItems();
          }}
          className="load-more"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </div>
  )
};

export default Tournaments;
