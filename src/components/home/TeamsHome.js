import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import KasterLogo from '../../LogoTeams/KasterLogo.png';
import isurusLogo from '../../LogoTeams/isurusLogo.png';
import coscuLogo from '../../LogoTeams/coscuLogo.png';
import mibrLogo from '../../LogoTeams/mibr.png';
import malvinasLogo from '../../LogoTeams/malvinasLogo.png';
import fgLogo from '../../LogoTeams/fgLogo.png';
import riverLogo from '../../LogoTeams/riverLogo.png';
import newPampas from '../../LogoTeams/newPampas.png';


const TeamsHome = () => (
    <div className="teams-position">
        <Link to='mibr' className="teams-size z-depth-5 real-button" title="Ver perfil de MIBR">
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={mibrLogo}/> 
            </LazyLoad>  
        </Link> 
        <Link to='isurus-gaming-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Isurus Gaming"> 
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={isurusLogo}/>   
            </LazyLoad> 
        </Link>
        <Link to='malvinas-gaming' className="teams-size z-depth-5 real-button" title="Ver perfil de Malvinas Gaming"> 
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={malvinasLogo}/>    
            </LazyLoad> 
        </Link>
        <Link to='furious' className="teams-size z-depth-5 real-button" title="Ver perfil de Furious Gaming"> 
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={fgLogo}/>    
            </LazyLoad> 
        </Link>
        <Link to='9z' className="teams-size z-depth-5 real-button" title="Ver perfil de 9z">
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={KasterLogo}/>      
            </LazyLoad>
        </Link>
        <Link to='coscu-army-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Coscu Army Esports">
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={coscuLogo}/>   
            </LazyLoad> 
        </Link>
        <Link to='river-plate' className="teams-size z-depth-5 real-button" title="Ver perfil de River Plate Esports">
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={riverLogo}/>     
            </LazyLoad>
        </Link>
        <Link to='new-pampas' className="teams-size z-depth-5 real-button" title="Ver perfil de New Pampas Esports">
            <LazyLoad offset={100} >
                <img className="logo-team-menu" alt="Logo Team" src={newPampas}/>  
            </LazyLoad>
        </Link>
    </div>
);

 
export default TeamsHome;