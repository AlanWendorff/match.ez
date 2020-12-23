import React, {useContext} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Moment from 'moment';
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setTeamLogo} from '../../../utility/SetTeamLogo';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {setGameMode} from '../../../utility/SetGameMode';
import './tarjetaMatchesCompletos.css';
import './matchprevio.css';

const MatchPrevio = ({prevMatch, teamId}) => {

    momentSpanishSetup();
    const ultimoMatch = prevMatch[0];

    const {number_of_games, league, serie, begin_at, winner_id, opponents, results, name} = ultimoMatch;
    const { data } = useContext(HeaderLogoContext);
    const {opponentLogo, opponentName, ownLogo, ownName, opponentSlug} = setTeamLogo(opponents, teamId);
    const {A_point, B_point} = setMatchResult(results, teamId);
    const {modalidad} = setGameMode(number_of_games);

    //eslint-disable-next-line
    return(
        <div className="card posicion-tarjeta size-prev-game container-gen-prev-game"> 
            <div className="card-image waves-effect waves-block waves-light">
                <div className="card-image prev-game-content cursor-default">
                    <div className="prev-game-header-container">
                        <p className="prev-game-header" style={{color: data.vibrant}}>{name}</p>
                    </div> 

                    <div className="prev-game-desktop">
                        <div className="logos-and-gamewin">
                            <Link to={`/${opponentSlug}`}>
                                <div className={winner_id === teamId? "match-loser outline-shade-black" :"match-winner outline-shade-black"}>                            
                                <LazyLoad offset={100} >
                                    <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-logo-prev-game" src={opponentLogo}/>
                                </LazyLoad>
                                </div> 
                            </Link>
                            <div>
                                <div className="game-win">
                                    <p className={winner_id === teamId? "match-loser point-A" :"match-winner point-A"}>{A_point}</p>
                                    <p>-</p>
                                    <p className={winner_id === teamId? "match-winner point-B" : "match-loser point-B"}>{B_point}</p>                           
                                </div>  
                            </div>
                            <div className={winner_id === teamId? "match-winner outline-shade-black" :"match-loser outline-shade-black"}>
                                <LazyLoad offset={100} >
                                    <img alt="b team" className="max-size-logo-prev-game" src={ownLogo}/>
                                </LazyLoad>
                            </div> 
                        </div>
                        <div className="text-in-card">
                            <p className="name-of-teams">{opponentName}</p> 
                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                            <p className="name-of-teams">{ownName}</p>
                        </div> 
                    </div>


                    <div className="prev-game-mobile">
                        <div className="row-team-name-gamewin">
                            <div className={winner_id === teamId? "match-loser outline-shade-black" :"match-winner outline-shade-black"}>                            
                                <LazyLoad offset={100} >
                                    <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-logo-prev-game" src={opponentLogo}/>
                                </LazyLoad>
                            </div> 
                            <p className={winner_id === teamId? "match-loser outline-shade-black" :"match-winner outline-shade-black"}>{opponentName}</p> 
                            <p className={winner_id === teamId? "match-loser point-A" :"match-winner point-A"}>{A_point}</p>
                        </div>

                        <div className="row-team-name-gamewin">
                            <div className={winner_id === teamId? "match-winner outline-shade-black" : "match-loser outline-shade-black"}>                            
                                <LazyLoad offset={100} >
                                    <img alt="b team" className="max-size-logo-prev-game" src={ownLogo}/>
                                </LazyLoad>  
                            </div> 
                            <p className={winner_id === teamId? "match-winner outline-shade-black" :"match-loser outline-shade-black"}>{ownName}</p>
                            <p className={winner_id === teamId? "match-winner point-B" : "match-loser point-B"}>{B_point}</p>
                        </div>

                        <div className="text-in-card">
                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div> 
                    </div>
                </div>            
            </div>
            <div className="card-content click-more-info activator cursor-pointer">
                <span className="head-font" style={{color: data.vibrant}}><i className="material-icons right">info</i></span>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>

                <p className="text-align cursor-default font-size">
                    <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>Torneo:</span> 
                    {league.name +" "+ serie.full_name}
                </p>                        
                <p className="text-align label-fecha cursor-default font-size">
                    <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>Se jugó el: </span>
                    <span>{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs</span>      
                </p>

            </div>
        </div>
    );
}
export default MatchPrevio;