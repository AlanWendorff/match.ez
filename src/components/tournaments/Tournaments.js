import { examplesTournamentsNull, examplesTournamentsAmerica, examplesTournamentsRest } from "./TournamentsExamples";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../Context/LocationContext";
import { ALL_TOURNAMENTS } from "../../routes/routes";
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router";
import "./Tournaments.css";
import Item from "./Item";

const Tournaments = () => {
    const history = useHistory();
    const { location } = useContext(LocationContext);
    const [examples, setExamples] = useState(examplesTournamentsNull);

    useEffect(() => {
        location === "america" && setExamples(examplesTournamentsAmerica);
        location === "rest" && setExamples(examplesTournamentsRest);
    }, [location]);

    const goToAllTournaments = () => history.push(ALL_TOURNAMENTS);

    return (
        <div className="height-100vh-pad-bot-90p tournament-container font-gilroy background-color-4all animate-fade-in-top-to-bottom">
            <SearchBar handleClick={goToAllTournaments} />

            <div className="child-tournament">
                <span className="color-text-white font-bold">TOURNAMENTS THAT MAY INTEREST YOU</span>
                {examples.map(({ img, name, id, colors }) => (
                    <Item image_url={img} colors={colors} name={name} id={id} key={id} />
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
