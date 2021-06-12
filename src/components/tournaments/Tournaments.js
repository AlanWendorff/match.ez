import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { examplesTournamentsNull, examplesTournamentsAmerica, examplesTournamentsRest } from "./TournamentsExamples";
import { LocationContext } from "../Context/LocationContext";
import { useHistory } from "react-router";
import { ALL_TOURNAMENTS } from "../../routes/routes";
import SearchTournament from "../SearchTournament/SearchTournament";
import Item from "./Item";
import "./tournaments.css";

const Tournaments = () => {
    const history = useHistory();
    const { location } = useContext(LocationContext);
    const [examples, setExamples] = useState(examplesTournamentsNull);

    useEffect(() => {
        location === "america" && setExamples(examplesTournamentsAmerica);
        location === "rest" && setExamples(examplesTournamentsRest);
    }, [location]);

    return (
        <div className="tournament-container font-gilroy background-color-4all">
            <SearchTournament tournaments={[]} />

            <div className="child-tournament">
                <span
                    className={`color-text-white font-bold animate__fadeInDown animate__faster ${
                        JSON.parse(localStorage.getItem("animations")) !== false && "animate__animated"
                    }`}
                >
                    TOURNAMENTS THAT MAY INTEREST YOU
                </span>
                {examples.map((tournament) => (
                    <Item tournament={tournament} key={tournament.id} />
                ))}
            </div>
            <div onClick={() => history.push(ALL_TOURNAMENTS)} className="load-more">
                <FontAwesomeIcon icon={faCaretDown} />
                View all tournaments
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </div>
    );
};

export default Tournaments;
