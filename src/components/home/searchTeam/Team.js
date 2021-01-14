import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const Team = ({team, setCollection, guardarEquipos, equipos, collection, setSaveButtonState}) => {
    
    const [teamsaved, setTeamSaved] = useState(false);
    
    return ( 
        <div className="team-container">
            <Link className="searched-team" to={`/${team.path}`} title={`Ver el perfil de ${team.name}`} key={team.id}>
                <LazyLoad offset={100} >
                    <img className="searched-team-img animate__animated animate__fadeInLeft animate__fast" alt={team.name} src={team.img}/>
                </LazyLoad>
                <span className="font-bold color-text-black animate__animated animate__fadeInRight animate__faster">{team.name}</span>
            </Link> 
            
            {team.pined === true?
                <div className={teamsaved? "pin-team-container" : "pin-team-container-saved" } onClick={() => {
                    //console.log("---pined");
                        if (teamsaved === false) {
                            //console.log("X delete pin");
                            const deletedTeam = collection.filter(deleteteam => deleteteam.name !== team.name);
                            setCollection( deletedTeam );   
                            const TeamAnteriorEliminado = equipos.filter(pastTeam => pastTeam.name !== team.name);
                            guardarEquipos(TeamAnteriorEliminado);
                            guardarEquipos([...TeamAnteriorEliminado, {id: team.id, img: team.img, name: team.name, path: team.path, pined: false }])
                            setTeamSaved(true);
                        }else{
                            //console.log(".pinging");
                            setCollection( [...collection, {img : team.img, name : team.name, path : team.path}] ); 
                            const TeamAnteriorEliminado = equipos.filter(pastTeam => pastTeam.name !== team.name);
                            guardarEquipos(TeamAnteriorEliminado);
                            guardarEquipos([...TeamAnteriorEliminado, {id: team.id, img: team.img, name: team.name, path: team.path, pined: true }])    
                            setTeamSaved(false);
                            setSaveButtonState({});
                        }
                    }}> 
                    <FontAwesomeIcon icon={faThumbtack}/>
                </div>

            :   
                <div className={teamsaved? "pin-team-container-saved": "pin-team-container"} onClick={() => {
                    //console.log("---not pined");
                        if (teamsaved === true) {
                            //console.log("X delete pin");
                            const deletedTeam = collection.filter(deleteteam => deleteteam.name !== team.name);
                            setCollection( deletedTeam );   
                            const TeamAnteriorEliminado = equipos.filter(pastTeam => pastTeam.name !== team.name);
                            guardarEquipos(TeamAnteriorEliminado);
                            guardarEquipos([...TeamAnteriorEliminado, {id: team.id, img: team.img, name: team.name, path: team.path, pined: false }])
                            setTeamSaved(false);
                        }else{
                            //console.log(".pinging");
                            setCollection( [...collection, {img : team.img, name : team.name, path : team.path}] ); 
                            const TeamAnteriorEliminado = equipos.filter(pastTeam => pastTeam.name !== team.name);
                            guardarEquipos(TeamAnteriorEliminado);
                            guardarEquipos([...TeamAnteriorEliminado, {id: team.id, img: team.img, name: team.name, path: team.path, pined: true }])
                            setTeamSaved(true);
                            setSaveButtonState({});
                        }
                    }}>
                            
                    <FontAwesomeIcon icon={faThumbtack}/>
                </div>
            }
        </div>       
     );
}
 
export default Team;

/*teamsaved?
                <div className="pin-team-container-saved" onClick={() => {
                        const deletedTeam = collection.filter(deleteteam => deleteteam.name !== team.name);
                        setCollection( deletedTeam );  
                        setTeamSaved(false);
                    }}>
                            
                    <FontAwesomeIcon icon={faThumbtack}/>
                </div>*/