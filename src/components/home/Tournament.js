import React from 'react';
import LazyLoad from 'react-lazyload';
import './tournament.css';

const Tournament = ({tournament}) => {
    const {name, image_url} = tournament;
    //real-button
    return(
        <div className="tournament-flex"> 
            <LazyLoad offset={100} >
                <img className="tournament-logo-size animate__animated animate__fadeIn animate__fast" alt={name} src={image_url}/>
            </LazyLoad>
            <span className="tournament-name">{name}</span>
        </div>  

    );
 };
//
export default Tournament;