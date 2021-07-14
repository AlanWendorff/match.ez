import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { examplesTournamentsNull, examplesTournamentsAmerica, examplesTournamentsRest } from "./TournamentsExamples";
import { LocationContext } from "../Context/LocationContext";
import { useHistory } from "react-router";
import { ALL_TOURNAMENTS } from "../../routes/routes";
import SearchTournament from "../SearchTournament/SearchTournament";
import Item from "./Item";
import "./Tournaments.css";

const Tournaments = () => {
    const history = useHistory();
    const { location } = useContext(LocationContext);
    const [examples, setExamples] = useState(examplesTournamentsNull);

    useEffect(() => {
        location === "america" && setExamples(examplesTournamentsAmerica);
        location === "rest" && setExamples(examplesTournamentsRest);
    }, [location]);

    return (
        <div className="height-100vh-pad-bot-90p tournament-container font-gilroy background-color-4all animate__fadeInDown animate__faster animate__animated">
            <SearchTournament/>

            <div className="child-tournament">
                <span
                    className="color-text-white font-bold"
                >
                    TOURNAMENTS THAT MAY INTEREST YOU
                </span>
                {examples.map(({img, name, id, colors}) => (
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
