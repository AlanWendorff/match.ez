import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TEAM } from "../../routes/routes";
import ProgressiveImage from "react-progressive-image";
import nopic from "../../Images/nopic.png";
import loader from "../../Images/loader.gif";

const Team = ({ team, setCollection, collection, setFirstPin }) => {
    const [teamsaved, setTeamSaved] = useState(false);
    useEffect(() => {
        const exist = collection.find((element) => element.id === team.id);
        exist === undefined ? setTeamSaved(false) : setTeamSaved(true);
    }, [teamsaved]);

    return (
        <div className="team-container" style={{ borderLeft: `5px solid ${team.colors.DarkMuted}` }}>
            <Link
                className="searched-team"
                to={TEAM.replace(":teamid", team.id)}
                title={`Look the team profile of: ${team.name}`}
                key={team.id}
            >
                <ProgressiveImage src={team.img === undefined ? nopic : team.img} placeholder={loader}>
                    {(src) => <img className="searched-team-img" src={src} alt={team.name} />}
                </ProgressiveImage>
                <span className="font-gilroy color-text-black">{team.name}</span>
            </Link>

            <div
                className={teamsaved ? "pin-team-container-saved" : "pin-team-container"}
                onClick={() => {
                    if (teamsaved === true) {
                        const deletedTeam = collection.filter((deleteteam) => deleteteam.id !== team.id);
                        setCollection(deletedTeam);
                        setTeamSaved(false);
                        setFirstPin(true);
                    } else {
                        setCollection([
                            ...collection,
                            {
                                img: team.img,
                                name: team.name,
                                id: team.id,
                                colors: { DarkMuted: team.colors.DarkMuted },
                            },
                        ]);
                        setTeamSaved(true);
                        setFirstPin(true);
                    }
                }}
            >
                <FontAwesomeIcon icon={faThumbtack} />
            </div>
        </div>
    );
};

export default Team;
