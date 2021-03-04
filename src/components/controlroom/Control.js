import React from 'react';
import './control.css';

const Control = ({tournamentArray, pathsArray}) => {

    return ( 
        <div className="secret">

            <h2 id="Teams" className="font-bold">{`TEAMS: ${pathsArray.length}`} ---- <a href="#Tournaments"> ir a torneos </a> </h2>
            
            {   
                pathsArray.map((team) => {
                    return(
                        <div className="secret-item-container" key={team.id}>
                            <span className="font-size-20px color-text-white">{team.id}</span>
                            <span className="font-size-20px color-text-white">{team.name}</span>
                            <span className="font-size-20px color-text-white">{team.path}</span>
                            <img src={team.img} />
                        </div>
                    );                                  
                })
            }

            <h2 id="Tournaments" className="font-bold">{`TOURNAMENTS: ${tournamentArray.length}`} ---- <a href="#Teams"> ir a teams </a></h2>

            {   
                tournamentArray.map((tournament) => {
                    return(
                        <div className="secret-item-container" key={tournament.id}>
                            <span className="font-size-20px color-text-white">{tournament.id}</span>
                            <span className="font-size-20px color-text-white">{tournament.name}</span>
                            <span className="font-size-20px color-text-white">{tournament.path}</span>
                            <img src={tournament.image_url} />
                        </div>
                    );                                  
                })
            }
            <div className="home-box-secret ">
                <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
            </div>
        </div>
     );
}
 
export default Control;