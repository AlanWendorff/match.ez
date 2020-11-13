import React from 'react';
import { Link } from 'react-router-dom';
import KasterLogo from '../../LogoTeams/KasterLogo.png';
import isurusLogo from '../../LogoTeams/isurusLogo.png';
import coscuLogo from '../../LogoTeams/coscuLogo.png';
import mibrLogo from '../../LogoTeams/mibr.png';
import malvinasLogo from '../../LogoTeams/malvinasLogo.png';
import fgLogo from '../../LogoTeams/fgLogo.png';


const TeamsHome = () => (
    <div className="teams-position">
        <Link to='mibr' className="teams-size z-depth-5 real-button" title="Ver perfil de MIBR">
            <img className="logo-team-menu" alt="Logo Team" src={mibrLogo}/> 
        </Link> 
        <Link to='isurus-gaming-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Isurus Gaming"> 
            <img className="logo-team-menu" alt="Logo Team" src={isurusLogo}/>   
        </Link>
        <Link to='malvinas-gaming' className="teams-size z-depth-5 real-button" title="Ver perfil de Malvinas Gaming"> 
            <img className="logo-team-menu" alt="Logo Team" src={malvinasLogo}/>  
        </Link>
        <Link to='furious' className="teams-size z-depth-5 real-button" title="Ver perfil de Furious Gaming"> 
            <img className="logo-team-menu" alt="Logo Team" src={fgLogo}/> 
        </Link>
        <Link to='9z' className="teams-size z-depth-5 real-button" title="Ver perfil de 9z">
            <img className="logo-team-menu" alt="Logo Team" src={KasterLogo}/>    
        </Link>
        <Link to='coscu-army-cs-go' className="teams-size z-depth-5 real-button" title="Ver perfil de Coscu Army Esports">
            <img className="logo-team-menu" alt="Logo Team" src={coscuLogo}/>    
        </Link>
    </div>
);

 
export default TeamsHome;