import React from "react";
import { DebounceInput } from "react-debounce-input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";

const SearchBar = ({ handleChange, handleClick, debounce, handleDebounce }) => (
    <div className="search-container">
        <div className="input-teams-container" onClick={handleClick} onChange={handleChange}>
            <FontAwesomeIcon className="background-color-yellow-theme" icon={faSearch} />
            {debounce ? (
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    onChange={handleDebounce}
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    autoComplete="off"
                    placeholder="Search teams:"
                />
            ) : (
                <input placeholder="Search tournament:"></input>
            )}
        </div>
    </div>
);

export default SearchBar;
