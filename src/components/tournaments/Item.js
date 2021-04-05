import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../Images/csgoLogoDefault.png';
import './tournaments.css';


const Item = ({customTournament, tournament}) => {
    let img;
    let name;
    if (tournament === undefined) {
        img = customTournament.img;
        name = customTournament.name;
    }else{
        img = tournament.image_url;
        name = tournament.name;
    }
    return(
        <div className="tournament-flex crosshair-expand"> 
            <ProgressiveImage src={img} placeholder={csgoLogo}>
                {src => <img className="tournament-logo-size" loading="lazy" src={src} alt={name} />}
            </ProgressiveImage>
            <span className="tournament-name">{name}</span>
        </div>  

    );
}
 
export default Item;