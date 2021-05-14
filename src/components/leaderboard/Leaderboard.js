import React from 'react';
import { faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TeamRanking from '../TeamRanking/TeamRanking';
import ProgressiveImage from 'react-progressive-image';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import './leaderboard.css'

const Leaderboard = ({leaderboard}) => {
    return ( leaderboard && leaderboard.length > 0 &&
        <div className="ladder transition-effect">
            <div className="space-between width-100percent columns-ladder">
                <span className="space-between font-gilroy" style={{width: '70px'}}><FontAwesomeIcon className="mr" icon={faUserFriends}/>Teams:</span>
                <span className="space-between font-gilroy" style={{width: '115px'}}><FontAwesomeIcon className="mr" icon={faTrophy}/>Matches won:</span>
            </div>
            
            {leaderboard.map(team  => (
                <div className={`ladder-team animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`} key={team.name}>
                    <div>
                        <TeamRanking name={team.name} />
                        <ProgressiveImage src={team.img === null? csgoLogoDefaultBlack : team.img} placeholder={csgoLogoDefaultBlack}>
                            {src => <img alt="laderboard team" src={src} />}
                        </ProgressiveImage>
                        <span className="font-gilroy">{team.name}</span>
                    </div>
                    <span className="font-gilroy-bold">{team.points}</span>
                </div>
            ))}
        </div>
     );
}
 
export default Leaderboard;