import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import csgoLogoDefaultBlack from '../../../ImagenesVarias/csgoLogoDefaultBlack.png';
import './leaderboard.css'

const Leaderboard = ({leaderboard}) => {
    const [titlestatus, setTitleStatus] = useState({});
    return ( 
        <div className="ladder transition-effect">
            <div className="ladder-title transition-effect" onClick={()=> { setTitleStatus({display: 'none'}); }} style={titlestatus}>
                <span className="text-align-center leaderboard-title highlight-text">LeaderBoard</span>
            </div>

            {titlestatus.display !== undefined?
                <div className="ladder-teams-container">
                    <div className="space-between width-100percent columns-ladder">
                        <span className="space-between" style={{width: '80px'}}><FontAwesomeIcon className="mr" icon={faUserFriends}/>Equipos:</span>
                        <span className="space-between" style={{width: '140px'}}><FontAwesomeIcon className="mr" icon={faTrophy}/>Partidos Ganados:</span>
                        <FontAwesomeIcon className="cursor-pointer cross-ladder" onClick={()=> { setTitleStatus({});}} icon={faTimes}/>
                    </div>
                    
                    {leaderboard.map(team  => (
                        <div className="ladder-team animate__animated animate__fadeInDown animate__faster" key={team.name}>
                            <div className="space-between">
                                <img className="width-30px mr-35px" src={team.img === null? csgoLogoDefaultBlack : team.img}/>
                                <span>{team.name}</span>
                            </div>
                            <span>{team.points}</span>
                        </div>
                    ))}
                </div>

            :
                null
            }
            
        </div>
     );
}
 
export default Leaderboard;