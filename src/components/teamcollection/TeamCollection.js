import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../ImagenesVarias/csgoLogoDefault.png';
import './teamcollection.css';

const examples = [
        {
            img: "https://cdn.pandascore.co/images/team/image/3209/ASTRALIS.png",
            name: "Astralis",
            path: "astralis"
        },
        {
            img: "https://cdn.pandascore.co/images/team/image/125863/isurus_2020_infocard.png",
            name: "Isurus Gaming",
            path: "isurus-gaming-cs-go"
        },
        {
            img: "https://cdn.pandascore.co/images/team/image/127693/10786.png",
            name: "River Plate",
            path: "river-plate"
        },
        {   
            img: "https://cdn.pandascore.co/images/team/image/3213/220px_team_liquidlogo_square.png",
            name: "Liquid",
            path: "liquid-cs-go"
        }
]

const TeamCollection = ({collection}) => {
    return(
        <div className="collection-container animate__animated animate__fadeInLeft animate__faster">
            <span className="color-text-white font-bold">{collection.length > 0? 'MY SHORTCUTS' : 'SOME TEAMS'}</span>
            <div className="teams-position mb-30px">
                {collection.length > 0?
                    collection.map(team => (
                        <Link key={team.name} to={`/${team.path}`} title={`Look the team profile of: ${team.name}`}> 
                            <div>
                                <div>
                                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                                        {src => <img className="" loading="lazy" src={src} alt={`${team.path}`} />}
                                    </ProgressiveImage>
                                </div>
                                <span>{team.name}</span>
                            </div>
                        </Link>    
                    ))
                    :
                    examples.map(team => (
                        <Link key={team.name} to={`/${team.path}`} title={`Look the team profile of: ${team.name}`}> 
                            <div>
                                <div>
                                    <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                                        {src => <img className="" loading="lazy" src={src} alt={`${team.path}`} />}
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