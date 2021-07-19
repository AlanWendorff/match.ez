import { DATABASE_TOURNAMENTS } from "../../constants/ApiEndpoints";
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../Tournaments/Tournaments.css";
import Item from "../Tournaments/Item";
import Loader from "../Loader/Loader";
import axios from "axios";

const AllTournaments = () => {
    const [alltournaments, setAllTournaments] = useState([]);
    const [filteredtournaments, setFilteredTournaments] = useState([]);
    const [showtournaments, setShowTournaments] = useState(true);
    const [advice, setAdvice] = useState(false);
    const [Input, setInput] = useState("");

    const FilterTournament = (e) => {
        const INPUT = e.target.value.toLowerCase();
        const filteredTournaments = [];
        alltournaments.map((tournament) => {
            if (tournament.name.toLowerCase().includes(INPUT) && INPUT !== "") {
                filteredTournaments.push(tournament);
            }
        });
        if (filteredTournaments.length !== 0) {
            setAdvice(false);
            setShowTournaments(true);
            setFilteredTournaments(filteredTournaments);
        } else {
            if (filteredTournaments.length === 0 && INPUT === "") {
                setFilteredTournaments(alltournaments);
                setAdvice(false);
                setShowTournaments(true);
            } else {
                setAdvice(true);
                setShowTournaments(false);
            }
        }
        setInput(INPUT);
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
        <div className="height-100vh-pad-bot-90p tournament-container font-gilroy background-color-4all animate-slide-top-to-bottom">
            <SearchBar handleChange={FilterTournament}/>
            <div className="child-tournament">
                {showtournaments &&
                    filteredtournaments.map(({ img, name, id, colors }) => (
                        <Item image_url={img} colors={colors} id={id} name={name} key={id} />
                    ))}

                {advice && (
                    <span className="color-text-white font-bold">NO TOURNAMENTS FOUND <br/> MATCHING WITH: "{Input}"</span>
                )}
            </div>
        </div>
    );
};

export default AllTournaments;
