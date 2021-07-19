import { DATABASE_SEARCH_TEAM } from "../../constants/ApiEndpoints";
import SearchBar from "../SearchBar/SearchBar";
import React, { useState } from "react";
import SaveInLS from "./SaveInLS";
import Team from "./Team";
import axios from "axios";
import "./SearchTeam.css";

const SearchTeam = ({ setCollection, collection }) => {
    const [teams, setTeams] = useState([]);
    const [firstpin, setFirstPin] = useState(false);

    const BuscarEquipos = (e) => {
        const config = {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        const INPUT = e.target.value.toLowerCase()
        if (INPUT.length !== 0) {
            axios(DATABASE_SEARCH_TEAM.replace(":letters", INPUT), config).then(({ data }) => {
                data ? setTeams(data) : setTeams([]);
            });
        } else {
            setTeams([]);
        }
    };

    const SaveOnLS = () => {
        setTimeout(() => {
            localStorage.setItem("collection", JSON.stringify(collection));
        }, 100);
    };

    return (
        <div className="search-team-container">
            <SearchBar handleDebounce={BuscarEquipos} debounce/>
            <div className="list-of-teams-container" style={{ marginTop: teams.length > 0 && "10px" }}>
                {teams.map((team) => (
                    <Team
                        key={team.id}
                        team={team}
                        setCollection={setCollection}
                        collection={collection}
                        setFirstPin={setFirstPin}
                    />
                ))}
                <SaveInLS collection={collection} SaveOnLS={SaveOnLS} firstpin={firstpin} />
            </div>
        </div>
    );
};

export default SearchTeam;
