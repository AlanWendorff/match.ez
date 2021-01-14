import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const Team = ({team, setCollection, collection}) => {
    
    const [teamsaved, setTeamSaved] = useState(false);

    return ( 
        <div className="team-container">
            <Link className="searched-team" to={`/${team.path}`} title={`Ver el perfil de ${team.name}`} key={team.id}>
                <LazyLoad offset={100} >
                    <img className="searched-team-img animate__animated animate__fadeInLeft animate__fast" alt={team.name} src={team.img}/>
                </LazyLoad>
                <span className="font-bold color-text-black animate__animated animate__fadeInRight animate__faster">{team.name}</span>
            </Link> 
            {teamsaved?
                <div className="pin-team-container-saved" onClick={() => {
                        const deletedTeam = collection.filter(deleteteam => deleteteam.name !== team.name);
                        setCollection( deletedTeam );  
                        setTeamSaved(false);
                    }}>
                            
                    <FontAwesomeIcon icon={faThumbtack}/>
                </div>
            
            :   
                <div className="pin-team-container" onClick={() => {
                        setCollection( [...collection, {img : team.img, name : team.name, path : team.path}] );  
                        setTeamSaved(true);
                    }}>
                            
                    <FontAwesomeIcon icon={faThumbtack}/>
                </div>
            }
            
        </div>       
     );
}
 
export default Team;