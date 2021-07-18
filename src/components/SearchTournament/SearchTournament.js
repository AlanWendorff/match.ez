import React from "react";
import { useHistory } from "react-router";
import { ALL_TOURNAMENTS } from "../../routes/routes";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchTournament.css";

const SearchTournament = ({ FilterTournament, tournaments }) => {
    const history = useHistory();
    return (
        <div className="search-container">
            <div
                className="input-teams-container"
                onClick={() => {
                    !tournaments && history.push(ALL_TOURNAMENTS);
                }}
                onChange={() => FilterTournament()}
            >
                <FontAwesomeIcon className="background-color-yellow-theme" icon={faSearch} />
                <input id="search_tournament" placeholder="Search tournament:"></input>
            </div>
        </div>
    );
};

export default SearchTournament;
