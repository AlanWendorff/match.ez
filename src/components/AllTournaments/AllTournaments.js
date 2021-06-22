import React, { useState, useEffect } from "react";
import { DATABASE_TOURNAMENTS } from "../../constants/ApiEndpoints";
import SearchTournament from "../SearchTournament/SearchTournament";
import axios from "axios";
import Item from "../Tournaments/Item";
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

    return (
        <div className="tournament-container font-gilroy background-color-4all">
            {alltournaments.length === 0 && (
                <div className="display-flex-justify-center height-100vh--50px width-100percent">
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {alltournaments.length !== 0 && (
                <>
                    <SearchTournament FilterTournament={FilterTournament} tournaments={filteredtournaments} />
                    <div className="child-tournament">
                        {showtournaments &&
                            filteredtournaments.map((tournament) => (
                                <Item tournament={tournament} key={tournament.id} />
                            ))}

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
                </>
            )}
        </div>
    );
};

export default AllTournaments;
