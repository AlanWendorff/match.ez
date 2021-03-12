import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../../ImagenesVarias/csgoLogoDefault.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const Team = ({team, setCollection, guardarEquipos, equipos, collection, setSaveButtonState, equiposdatabase}) => {
    
    const [teamsaved, setTeamSaved] = useState(false);
    const databaseTeam = equiposdatabase.find(databaseTeam => databaseTeam.name === team.name);

    return ( 
        <div className="team-container">
            <Link className="searched-team" to={`/${team.path}`} title={`Ver el perfil de ${team.name}`} key={team.id}>
                <ProgressiveImage src={databaseTeam.img} placeholder={csgoLogo}>
                    {src => <img className="searched-team-img animate__animated animate__fadeInLeft animate__fast" src={src} alt={team.name}  />}
                </ProgressiveImage>
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
                            setSaveButtonState({});
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
                            setSaveButtonState({});
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