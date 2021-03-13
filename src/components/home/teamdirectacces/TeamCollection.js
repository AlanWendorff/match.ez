import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../../ImagenesVarias/csgoLogoDefault.png';
import './teamcollection.css';

const TeamCollection = ({collection}) => {

    if (collection.length > 0) {
        return(
            <div className="collection-container animate__animated animate__fadeInLeft animate__faster">
                <span className="color-text-white font-bold font-size-50px mb-40px">MIS ACCESOS DIRECTOS</span>
                <div className="teams-position mb-30px">
                {
                    collection.map(team => (
                        <Link key={team.name} to={`/${team.path}`} className="teams-size z-depth-5 real-button" title={`Ver Perfil de ${team.name}`}> 
                            <ProgressiveImage src={team.img} placeholder={csgoLogo}>
                                {src => <img className="logo-team-menu" src={src} alt={`${team.path}`} />}
                            </ProgressiveImage>
                        </Link>    
                    ))
                }
                </div> 
            </div> 
        );
    }else{
        return(<div></div>);
    }
    
}
//<img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt={`${team.path}`} src={team.img}/>   
export default TeamCollection;