import React from 'react';
import CircularItem from './CircularItem';
import './circulartournaments.css';

const CircularTournaments = ({tournaments}) => {
    return ( 
        <div className="circular-container">
            {
                tournaments.map(tournament => ( 
                    <CircularItem 
                        key={tournament.id}
                        img={tournament.img}
                        name={tournament.name}
                        id={tournament.id}
                    />
                ))
            }
        </div>
     );
}
 
export default CircularTournaments;