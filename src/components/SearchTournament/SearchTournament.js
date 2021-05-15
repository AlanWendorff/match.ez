import React from "react";
import "./searchtournament.css";

const SearchTournament = ({FilterTournament, tournaments, getTournamentsFromDatabase}) => {
  return (
    <div
      className={`search-container animate__fadeInDown animate__faster ${
        JSON.parse(localStorage.getItem("animations")) !== false &&
        "animate__animated"
      }`}
    >
      <div title="Search Tournament" className="search-tournaments-input input-field col s6" onClick={()=> { tournaments.length === 0 && getTournamentsFromDatabase(); }} onChange={() => {FilterTournament()}}>
        <input id="last_name" type="text" className="validate" autoComplete="off"></input>
        <label className="color-text-black" htmlFor="last_name">Search Tournament:</label>
      </div>
    </div>
  );
};

export default SearchTournament;
