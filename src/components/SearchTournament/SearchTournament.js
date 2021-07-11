import React from "react";
import { useHistory } from "react-router";
import { ALL_TOURNAMENTS } from "../../routes/routes";
import "./SearchTournament.css";

const SearchTournament = ({FilterTournament, tournaments}) => {
  const history = useHistory();
  return (
    <div
      className="search-container"
    >
      <div title="Search Tournament" className="search-tournaments-input input-field col s6" onClick={()=> { !tournaments && history.push(ALL_TOURNAMENTS); }} onChange={() => FilterTournament()}>
        <input id="search_tournament" type="text" className="validate" autoComplete="off"></input>
        <label className="color-text-black" htmlFor="search_tournament">Search Tournament:</label>
      </div>
    </div>
  );
};

export default SearchTournament;
