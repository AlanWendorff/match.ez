import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import KasterLogo from '../../LogoTeams/KasterLogo.png';
import isurusLogo from '../../LogoTeams/isurusLogo.png';
import coscuLogo from '../../LogoTeams/coscuLogo.png';
import riverLogo from '../../LogoTeams/riverLogo.png';


const TeamsHome = () => (
    <div className="teams-position animate__animated animate__backInLeft animate__faster">
        <Link to='isurus-gaming-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Isurus Gaming"> 
            <LazyLoad offset={100} >
                <img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt="Logo Team" src={isurusLogo}/>   
            </LazyLoad> 
        </Link>
        <Link to='9z' className="teams-size z-depth-5 real-button" title="Ver perfil de 9z">
            <LazyLoad offset={100} >
                <img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt="Logo Team" src={KasterLogo}/>      
            </LazyLoad>
        </Link>
        <Link to='coscu-army-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Coscu Army Esports">
            <LazyLoad offset={100} >
                <img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt="Logo Team" src={coscuLogo}/>   
            </LazyLoad> 
        </Link>
        <Link to='river-plate' className="teams-size z-depth-5 real-button" title="Ver perfil de River Plate Esports">
            <LazyLoad offset={100} >
                <img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt="Logo Team" src={riverLogo}/>     
            </LazyLoad>
        </Link>
    </div>
);

 
export default TeamsHome;