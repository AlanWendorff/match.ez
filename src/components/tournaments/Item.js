import React from "react";
import ProgressiveImage from "react-progressive-image";
import loader from "../../assets/images/placeholder/loader.gif";
import nopic from "../../assets/images/placeholder/nopic.png";
import { LOOKMATCHES } from "../../titles/TitleTag";
import { TOURNAMENT } from "../../routes/routes";
import { Link } from "react-router-dom";
import "./Tournaments.css";

const Item = ({image_url, name, id, colors}) => (
    <Link
        style={{ backgroundColor: colors.DarkVibrant }}
        to={TOURNAMENT.replace(":tournamentId", id)}
        className="tournament-size z-depth-5"
        title={`${LOOKMATCHES} ${name}`}
        key={id}
    >
        <div className="tournament-flex">
            <div>
                <ProgressiveImage src={image_url ? image_url : nopic} placeholder={loader}>
                    {(src) => <img className="tournament-logo-size" src={src} alt={name} />}
                </ProgressiveImage>
            </div>
            <span className="tournament-name">{name}</span>
        </div>
    </Link>
);

export default Item;
