import React, { useContext, useState, useEffect } from "react";
import { DATABASE_TOURNAMENTS } from "../../routes/ApiEndpoints";
import SearchTournament from "../SearchTournament/SearchTournament";
import axios from "axios";
import Item from "../Tournaments/Item";
import "../Tournaments/tournaments.css";

const AllTournaments = () => {
    const [alltournaments, setAllTournaments] = useState([]);
    const [filteredtournaments, setFilteredTournaments] = useState([]);
    const [showtournaments, setShowTournaments] = useState(true);

    const FilterTournament = () => {
        let input = document.getElementById("last_name").value.toLowerCase();
        let filteredTournaments = [];
        alltournaments.map((tournament) => {
            if (tournament.name.toLowerCase().includes(input) && input !== "") {
                filteredTournaments.push(tournament);
            }
        });
        filteredtournaments.length !== 0 && input === "" ? setShowTournaments(true) : setShowTournaments(true);
        setFilteredTournaments(filteredTournaments);
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
    console.log(filteredtournaments.length, alltournaments.length);
    return (
        <div className="tournament-container font-gilroy background-color-4all">
            {alltournaments.length === 0 ? (
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
            ) : (
                <>
                    <SearchTournament FilterTournament={FilterTournament} tournaments={filteredtournaments} />
                    <div className="child-tournament">
                        {showtournaments ? (
                            filteredtournaments.map((tournament) => (
                                <Item tournament={tournament} key={tournament.id} />
                            ))
                        ) : (
                            <span
                                className={`color-text-white font-bold animate__fadeInDown animate__faster ${
                                    JSON.parse(localStorage.getItem("animations")) !== false && "animate__animated"
                                }`}
                            >
                                THERE ARE NO TOURNAMENTS THAT CONTAINS '{document.getElementById("last_name").value}'
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllTournaments;
