import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const TeamCollection = ({collection}) => {
    if (collection !== undefined) {
        return(
            <div className="teams-position animate__animated animate__backInLeft animate__faster">
            {
                collection.map(team => (
                    <Link to={`/${team.path}`} className="teams-size z-depth-5 real-button" title={`Ver Perfil de ${team.name}`}> 
                        <LazyLoad offset={100} >
                            <img className="logo-team-menu animate__animated animate__fadeIn animate__fast" alt={`image of ${team.path}`} src={team.img}/>   
                        </LazyLoad> 
                    </Link>    
                ))
            }
            </div>  
        );
    }else{
        return(<div></div>);
    }
    
}
 
export default TeamCollection;