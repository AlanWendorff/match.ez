import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../ImagenesVarias/csgoLogoDefault.png';
import './tournaments.css';


const Item = ({customTournament, tournament}) => {
    let img = customTournament.img;
    let name = customTournament.name;
    if (tournament !== undefined) img = tournament.image_url; name = tournament.name;
    return(
        <div className="tournament-flex"> 
            <ProgressiveImage src={img} placeholder={csgoLogo}>
                {src => <img className="tournament-logo-size" src={src} alt={name} />}
            </ProgressiveImage>
            <span className="tournament-name">{name}</span>
        </div>  

    );
}
 
export default Item;