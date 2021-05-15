import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../Images/csgoLogoDefault.png';
import { usePalette } from "react-palette";
import { LOOKMATCHES } from '../../titlestag/titlestag';
import { TOURNAMENT } from '../../routes/routes';
import { Link } from 'react-router-dom';
import './tournaments.css';

const Item = ({tournament}) => {
    let img;
    let name;

    let colorTeam = usePalette("https://proxy-kremowy.herokuapp.com/" + tournament.image_url).data;
    /* let colorTeam = {
        darkMuted: "#1c313a",
        darkVibrant: "#455a64",
        lightMuted: "#455a64",
        lightVibrant: "#718792",
        muted: "#1c313a",
        vibrant: "#718792",
      }; */
    img = tournament.image_url;
    name = tournament.name;
    
    return(
        <Link style={{ backgroundColor: colorTeam.darkVibrant }} to={TOURNAMENT.replace(':tournamentId', tournament.id)} className={`tournament-size z-depth-5 animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`} title={`${LOOKMATCHES} ${tournament.name}`} key={tournament.id}>
        <div className="tournament-flex crosshair-expand"> 
            <ProgressiveImage src={img} placeholder={csgoLogo}>
                {src => <img className="tournament-logo-size" src={src} alt={name} />}
            </ProgressiveImage>
            <span className="tournament-name">{name}</span>
        </div> 
        </Link>
    );
}
 
export default Item;