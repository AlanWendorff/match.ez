import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './tournament.css';

const Tournament = ({tournament}) => {
    const {name, image_url} = tournament;
    //real-button
    return(
        <div className="tournament-flex"> 
            <FontAwesomeIcon className="color-text-black" icon={faTrophy}/>
            <div className="tournament-canvas">
                <img className="tournament-logo-size" alt="Logo Team" src={image_url}/>
                <span className="tournament-name">{name}</span>
            </div>
        </div>  

    );
 };

export default Tournament;