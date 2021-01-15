import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../ImagenesVarias/csgoLogoDefault.png';
import './tournament.css';

const Tournament = ({tournament}) => {
    const {name, image_url} = tournament;
    return(
        <div className="tournament-flex"> 
            <ProgressiveImage src={image_url} placeholder={csgoLogo}>
                {src => <img className="tournament-logo-size" src={src} alt={name} />}
            </ProgressiveImage>
            <span className="tournament-name">{name}</span>
        </div>  

    );
 };
//
export default Tournament;