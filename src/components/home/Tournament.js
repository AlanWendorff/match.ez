import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import './tournament.css';

const Tournament = ({tournament}) => {
    const {name, image_url} = tournament;
    //real-button
    return(
        <div className="tournament-flex"> 
            <FontAwesomeIcon className="color-text-black" icon={faTrophy}/>
            <div className="tournament-canvas">
            <LazyLoad offset={100} >
                <img className="tournament-logo-size" alt={name} src={image_url}/>
            </LazyLoad>
            <span className="tournament-name">{name}</span>
            </div>
        </div>  

    );
 };
//
export default Tournament;