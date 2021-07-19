import React from "react";
import "./TeamsAliveInTournament.css";

const TeamsAliveInTournament = () => {
    return (
        <div className="alive-teams-container">
            <span className="color-text-white font-bold">Teams that continue in the competition</span>
            <div className="list-of-teams">
                {/* teams.map(({ name, image }, index) => (
                    <div className="ladder-team animate-fade-in-top-to-bottom" key={team.name}>
                        <div>image</div>
                        <span className="font-gilroy-bold">name</span>
                    </div>
                )) */}
            </div>
        </div>
    );
};

export default TeamsAliveInTournament;
