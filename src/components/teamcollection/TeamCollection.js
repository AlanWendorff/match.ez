import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../Images/csgoLogoDefault.png';
import { TEAM } from '../../routes/routes';
import './teamcollection.css';

const examples = [
        {
            img: "https://cdn.pandascore.co/images/team/image/3209/ASTRALIS.png",
            name: "Astralis",
            id: 3209,
        },
        {
            img: "https://cdn.pandascore.co/images/team/image/125863/isurus_2020_infocard.png",
            name: "Isurus Gaming",
            id: 125863,
        },
        {
            img: "https://cdn.pandascore.co/images/team/image/125785/7718.png",
            name: "Movistar Riders",
            id: 125785,
        },
        {   
            img: "https://cdn.pandascore.co/images/team/image/3213/220px_team_liquidlogo_square.png",
            name: "Liquid",
            id: 3213,
        },
        {   
            img: "https://cdn.pandascore.co/images/team/image/3393/600px_winstrike_team_2019_logo.png",
            name: "Winstrike",
            id: 3393,
        }
]

const TeamCollection = ({collection}) => {
    return(
        <div className="collection-container animate__animated animate__fadeInLeft animate__faster">
            <span className="color-text-white font-bold">{collection.length > 0? 'MY SHORTCUTS' : 'SOME TEAMS'}</span>
            <div className="teams-position mb-30px">
                {collection.length > 0?
                    collection.map(team => (
                        <Link key={team.name} to={TEAM.replace(':teamid', team.id)} title={`Look the team profile of: ${team.name}`}> 
                            <div className="crosshair-green">
                                <div>
                                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                                        {src => <img className="" loading="lazy" src={src} alt={`${team.name}`} />}
                                    </ProgressiveImage>
                                </div>
                                <span>{team.name}</span>
                            </div>
                        </Link>    
                    ))
                    :
                    examples.map(team => (
                        <Link key={team.name} to={TEAM.replace(':teamid', team.id)} title={`Look the team profile of: ${team.name}`}> 
                            <div className="crosshair-green">
                                <div>
                                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                                        {src => <img className="" loading="lazy" src={src} alt={`${team.name}`} />}
                                    </ProgressiveImage>
                                </div>
                                <span>{team.name}</span>
                            </div>
                        </Link>    
                    ))
                }
            </div> 
        </div> 
    );
}  
export default TeamCollection;