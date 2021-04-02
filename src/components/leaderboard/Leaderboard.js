import React from 'react';
import { faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressiveImage from 'react-progressive-image';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import './leaderboard.css'

const Leaderboard = ({leaderboard}) => {
    return ( leaderboard && leaderboard.length > 0 &&
        <div className="ladder transition-effect">
            <div className="space-between width-100percent columns-ladder">
                <span className="space-between" style={{width: '70px'}}><FontAwesomeIcon className="mr" icon={faUserFriends}/>Teams:</span>
                <span className="space-between" style={{width: '115px'}}><FontAwesomeIcon className="mr" icon={faTrophy}/>Matches won:</span>
            </div>
            
            {leaderboard.map(team  => (
                <div className="ladder-team animate__animated animate__fadeInDown animate__faster" key={team.name}>
                    <div className="space-between">
                        <ProgressiveImage src={team.img === null? csgoLogoDefaultBlack : team.img} placeholder={csgoLogoDefaultBlack}>
                            {src => <img alt="laderboard team" className="width-30px mr-35px" src={src} />}
                        </ProgressiveImage>
                        <span>{team.name}</span>
                    </div>
                    <span>{team.points}</span>
                </div>
            ))}
        </div>
     );
}
 
export default Leaderboard;