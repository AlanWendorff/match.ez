import React, { useContext, useState, useEffect } from "react";
import { TournamentContext } from "../Context/TournamentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { examplesTournamentsNull, examplesTournamentsAmerica, examplesTournamentsRest } from "./TournamentsExamples";
import { LocationContext } from "../Context/LocationContext";
import SearchTournament from "../SearchTournament/SearchTournament";
import Item from "./Item";
import "./tournaments.css";

const Tournaments = () => {
  const { tournamentsdatabase, getTournamentsFromDatabase } =useContext(TournamentContext);
  const { location } = useContext(LocationContext);
  const [examples, setExamples] = useState(examplesTournamentsNull);
  const [tournaments, setTournaments] = useState([]);
  const [mode, setMode] = useState("example");

  const FilterTournament = () => {
    setMode("tournaments");
    let input = document.getElementById("last_name").value.toLowerCase();
    input.length === 0&& setMode("example")
    let filteredTournaments = [];
    tournamentsdatabase.map((tournament) => {
      if (tournament.name.toLowerCase().includes(input) && input !== "") {
        filteredTournaments.push(tournament);
      }
    });
    setTournaments(filteredTournaments);
  };
  const loadAll = () => {
    setMode("tournaments");
    setTournaments(tournamentsdatabase);
  };

  useEffect(() => {
    tournamentsdatabase.length === 0 && getTournamentsFromDatabase();
    location === "america" && setExamples(examplesTournamentsAmerica);
    location === "rest" && setExamples(examplesTournamentsRest);
  }, [tournamentsdatabase, location]);
  
  return (
    <div
      className="tournament-container font-gilroy background-color-4all"
      onContextMenu={(e) =>
        window.innerWidth > 1024 ? null : e.preventDefault()
      }
    >
      <SearchTournament FilterTournament={FilterTournament} />
      {mode === "tournaments" &&
        <div className="child-tournament">
          {tournaments.length !== 0?
            tournaments.map((tournament) => (
              <Item tournament={tournament} key={tournament.id} />
            ))
            :
            <span className={`color-text-white font-bold animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>THERE ARE NO TOURNAMENTS THAT CONTAINS '{document.getElementById("last_name").value}'</span>
          }
        </div>
      }
      {mode === "example"&&
        <div className="child-tournament">
          <span className={`color-text-white font-bold animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>TOURNAMENTS THAT MAY INTEREST YOU</span>
          {
            examples.map((tournament) => (
              <Item tournament={tournament} key={tournament.id} />
            ))
          }
        </div>
      }
      {tournaments.length !== tournamentsdatabase.length && (
        <div
          onClick={() => {
            loadAll();
          }}
          className="load-more"
        >
          <FontAwesomeIcon icon={faCaretDown} />
          View all Tournaments
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      )}
    </div>
  );
};

export default Tournaments;
