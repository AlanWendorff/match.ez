import React, { useState, useEffect } from "react";
import { DATABASE_TOURNAMENTS } from "../../constants/ApiEndpoints";
import SearchTournament from "../SearchTournament/SearchTournament";
import axios from "axios";
import Item from "../Tournaments/Item";
import Loader from "../Loader/Loader";
import "../Tournaments/Tournaments.css";

const AllTournaments = () => {
    const [alltournaments, setAllTournaments] = useState([]);
    const [filteredtournaments, setFilteredTournaments] = useState([]);
    const [showtournaments, setShowTournaments] = useState(true);
    const [advice, setAdvice] = useState(false);
    const [Input, setInput] = useState("");

    const FilterTournament = () => {
        let input = document.getElementById("search_tournament").value.toLowerCase();
        let filteredTournaments = [];
        alltournaments.map((tournament) => {
            if (tournament.name.toLowerCase().includes(input) && input !== "") {
                filteredTournaments.push(tournament);
            }
        });
        if (filteredTournaments.length !== 0) {
            setAdvice(false);
            setShowTournaments(true);
            setFilteredTournaments(filteredTournaments);
        } else {
            if (filteredTournaments.length === 0 && input === "") {
                setFilteredTournaments(alltournaments);
                setAdvice(false);
                setShowTournaments(true);
            } else {
                setAdvice(true);
                setShowTournaments(false);
            }
        }
        setInput(input);
    };

    useEffect(() => {
        const config = {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios(DATABASE_TOURNAMENTS, config).then(({ data }) => {
            setFilteredTournaments(data);
            setAllTournaments(data);
        });
    }, []);

    return alltournaments.length === 0 ? (
        <Loader />
    ) : (
        <div className="tournament-container font-gilroy background-color-4all">
            <SearchTournament FilterTournament={FilterTournament} tournaments={filteredtournaments} />
            <div className="child-tournament">
                {showtournaments &&
                    filteredtournaments.map((tournament) => <Item tournament={tournament} key={tournament.id} />)}

                {advice && (
                    <span
                        className={`color-text-white font-bold animate__fadeInDown animate__faster ${
                            JSON.parse(localStorage.getItem("animations")) !== false && "animate__animated"
                        }`}
                    >
                        THERE ARE NO TOURNAMENTS THAT CONTAINS "{Input}"
                    </span>
                )}
            </div>
        </div>
    );
};

export default AllTournaments;
