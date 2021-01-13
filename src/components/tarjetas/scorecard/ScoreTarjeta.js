import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faSkullCrossbones, faPlus } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import csgoLogoDefault from '../../../ImagenesVarias/csgoLogoDefault.png';
import csgoHeadshot from '../../../ImagenesVarias/csgoHeadshot.png';

import './tarjetaScore.css';
const ScoreTarjeta = ({scoreMatch, prevMatch}) => {
    const {teams} = scoreMatch;
    const [hide, guardarHide] = useState([]);
    const [hideTitle, guardarHideTitle] = useState([]);
    const [active, guardarActive] = useState(false);
    let screenWidth = window.innerWidth;
    let ultimoMatch = prevMatch[0];
    const {opponents} = ultimoMatch;
    let TeamLogoA = "";
    let TeamLogoB = "";
    
    if(teams && teams.length > 0){
        for (let i=0; i< opponents.length; i++){                   // get EVER the opponent team logo (pandascore object index of opponent logo team are irregular)
            if(opponents[0].opponent.image_url === null){
                TeamLogoA = csgoLogoDefault;
            }else if(opponents[1].opponent.image_url === null){
                TeamLogoB = csgoLogoDefault;
            };
            if(scoreMatch.teams[0].name === opponents[0].opponent.name) {
                TeamLogoA = opponents[0].opponent.image_url;
                TeamLogoB = opponents[1].opponent.image_url;
            }else{
                TeamLogoA = opponents[1].opponent.image_url;
                TeamLogoB = opponents[0].opponent.image_url;
            }  
        };  
    };   

    function hideShow(){
        if (active) {
            guardarHide({
                display: 'none',
            });
            guardarHideTitle({
                display: 'block',
            });
            guardarActive(false);
        }else{
            guardarHide({
                display: 'flex',
            });
            guardarHideTitle({
                display: 'none',
            });
            guardarActive(true);
        };   
    };

    if (teams && teams.length > 0) {
        if (screenWidth >= 771){
            return ( 
                <div className="container-tarjeta-score">  
                    <div className="head-score-icons-kda-button-container z-depth-5">
                        <a href="#/" className="waves-effect waves-light btn red kda-button-size" onClick={() => hideShow()}><i className="material-icons right">chevron_right</i>K A M H</a>    
                        <p className="text-explain-game-stadistic" style={hideTitle}>Estadísticas de los jugadores en la serie.</p>
                        
                        <div className="kda-icons" style={hide}>
                            <FontAwesomeIcon className="color-text-black head-score-icons" style={hide} icon={faCrosshairs}/>
                            <FontAwesomeIcon className="color-text-black head-score-icons" style={hide} icon={faPlus}/>
                            <FontAwesomeIcon className="color-text-black head-score-icons" style={hide} icon={faSkullCrossbones}/>
                            <img alt="Headshot icon" className="head-score-icons" style={hide} src={csgoHeadshot}/>
                        </div>
                    </div>
                    <div className="col s12 m6 cursor-default">
                        <div className="card darken-1 background-tarjeta-score tamano-tarjeta-score" style={hide}>
                            <div className="card-content white-text parent">
                                <div>
                                    <div className="background-image-container">
                                        <div className="team-a-lienzo-background">
                                            <LazyLoad offset={100} >
                                                <img alt="a team" className="backgrounde-image-size" src={TeamLogoA}/>  
                                            </LazyLoad> 
                                        </div>
                                        <div className="team-b-lienzo-background">
                                            <LazyLoad offset={100} >
                                                <img alt="b team" className="backgrounde-image-size" src={TeamLogoB}/> 
                                            </LazyLoad>   
                                        </div>
                                    </div>
                                    <hr className="hr-score"/>
                                    
                                    <table className="child">
                                        <thead>
                                            <tr className="line-width">
                                                <th className="font-size space top-line-padding color-text-black">Jugador</th>
                                                <th className="text-to-end font-size-20 top-line-padding text-align-center color-text-black">Kills</th>
                                                <th className="text-to-end font-size-20 top-line-padding text-align-center color-text-black">Asistencias</th>
                                                <th className="text-to-end font-size-20 top-line-padding text-align-center color-text-black">Muertes</th>
                                                <th className="text-to-end font-size-20 top-line-padding text-align-center color-text-black">Headshots</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                scoreMatch.teams[0].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                                    const {counts} = stats;
                                                    return(
                                                        <tr className="line-width" key={index}>
                                                            <td className="space color-text-black">{name}</td>
                                                            <td className="text-align-center color-text-black">{counts.kills}</td>
                                                            <td className="text-align-center color-text-black">{counts.assists}</td>
                                                            <td className="text-align-center color-text-black">{counts.deaths}</td>
                                                            <td className="text-align-center color-text-black">{counts.headshots}</td>
                                                        </tr>
                                                    );                                  
                                                })
                                            }
                                            <tr className="line-width">
                                                <td className="space color-text-black"></td>
                                                <td className="text-align-center color-text-black"></td>
                                                <td className="text-align-center color-text-black"></td>
                                                <td className="text-align-center color-text-black"></td>
                                                <td className="text-align-center color-text-black"></td>
                                            </tr>
                                            {   
                                                scoreMatch.teams[1].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                                    const {counts} = stats;
                                                    return(
                                                        <tr className="line-width" key={index}>
                                                            <td className="space color-text-black">{name}</td>
                                                            <td className="text-align-center color-text-black">{counts.kills}</td>
                                                            <td className="text-align-center color-text-black">{counts.assists}</td>
                                                            <td className="text-align-center color-text-black">{counts.deaths}</td>
                                                            <td className="text-align-center color-text-black">{counts.headshots}</td>
                                                        </tr>
                                                    );                                  
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            }else{
                return ( 
                    <div className="container-tarjeta-score">  
                        <div className="text-align head-score-icons-kda-button-container z-depth-5">
                            <a href="#/" className="waves-effect waves-light btn red kda-button-size" onClick={() => hideShow()}><i className="material-icons right">chevron_right</i>K A M H</a>    
                            <p style={hideTitle}>Estadísticas de los jugadores en la serie.</p>
                        </div>
                        <div className="col s12 m6 cursor-default">
                            <div className="card darken-1 background-tarjeta-score tamano-tarjeta-score" style={hide}>
                                <div className="card-content white-text parent">
                                    <div>
                                        <div className="background-image-container">
                                            <div className="team-a-lienzo-background">
                                                <img alt="a team" className="backgrounde-image-size" src={TeamLogoA}/>  
                                            </div>
                                            <div className="team-b-lienzo-background">
                                                <img alt="b team" className="backgrounde-image-size" src={TeamLogoB}/>  
                                            </div>
                                        </div>
                                        <hr className="hr-score"/>
                                        
                                        <table className="child">
                                            <thead>
                                                <tr className="line-width">
                                                    <th className="font-size space top-line-padding color-text-black">Jugador</th>
                                                    <th className="text-to-end font-size top-line-padding text-align-center color-text-black">K.</th>
                                                    <th className="text-to-end font-size top-line-padding text-align-center color-text-black">A.</th>
                                                    <th className="text-to-end font-size top-line-padding text-align-center color-text-black">M.</th>
                                                    <th className="text-to-end font-size top-line-padding text-align-center color-text-black">H.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    scoreMatch.teams[0].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                                        const {counts} = stats;
                                                        return(
                                                            <tr className="line-width" key={index}>
                                                                <td className="space color-text-black font-bold font-size">{name}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.kills}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.assists}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.deaths}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.headshots}</td>
                                                            </tr>
                                                        );                                  
                                                    })
                                                }
                                                <tr className="line-width">
                                                    <td className="space color-text-black"></td>
                                                    <td className="text-align-center color-text-black"></td>
                                                    <td className="text-align-center color-text-black"></td>
                                                    <td className="text-align-center color-text-black"></td>
                                                    <td className="text-align-center color-text-black"></td>
                                                </tr>
                                                {   
                                                    scoreMatch.teams[1].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                                        const {counts} = stats;
                                                        return(
                                                            <tr className="line-width" key={index}>
                                                                <td className="space color-text-black font-bold font-size">{name}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.kills}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.assists}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.deaths}</td>
                                                                <td className="text-align-center color-text-black font-bold font-size">{counts.headshots}</td>
                                                            </tr>
                                                        );                                  
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
         
    }else{
        return ( 
            <div className="container-tarjeta-score cursor-default">
                <div className="container-no-stadistic z-depth-5">    
                    <p className="text-align-center">No hay estadísticas de los jugadores para este partido o serie.</p>
                </div> 
            </div>    
        );
    };
}
 
export default ScoreTarjeta;