import React from 'react';
import './tournament.css';

const Tournament = ({tournament}) => {
    const {name, image_url} = tournament;
    return(

        <div className="tournament-size z-depth-5 real-button cursor-pointer"> 
            <img className="ca-wygers-shadow tournament-logo-size" alt="Logo Team" src={image_url}/> 
            <span className="tournament-name">{name}</span>
        </div>  

    );
 };

export default Tournament;