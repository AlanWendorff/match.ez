import React from "react";
import ProgressiveImage from "react-progressive-image";
import loader from "../../assets/images/placeholder/loader.gif";
import nopic from "../../assets/images/placeholder/nopic.png";
import { LOOKMATCHES } from "../../titles/TitleTag";
import { TOURNAMENT } from "../../routes/routes";
import { Link } from "react-router-dom";
import "./Tournaments.css";

const Item = ({ tournament }) => (
    <Link
        style={{ backgroundColor: tournament.colors.DarkVibrant }}
        to={TOURNAMENT.replace(":tournamentId", tournament.id)}
        className={`tournament-size z-depth-5 animate__fadeInDown animate__faster ${
            JSON.parse(localStorage.getItem("animations")) !== false && "animate__animated"
        }`}
        title={`${LOOKMATCHES} ${tournament.name}`}
        key={tournament.id}
    >
        <div className="tournament-flex">
            <div>
                <ProgressiveImage src={tournament.img === undefined ? nopic : tournament.img} placeholder={loader}>
                    {(src) => <img className="tournament-logo-size" src={src} alt={tournament.name} />}
                </ProgressiveImage>
            </div>
            <span className="tournament-name">{tournament.name}</span>
        </div>
    </Link>
);

export default Item;
