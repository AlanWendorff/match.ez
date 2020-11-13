import React, {useContext, useEffect} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import { Link } from 'react-router-dom';
import Moment from 'moment';
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setTeamLogo} from '../../../utility/SetTeamLogo';
import {changeCardTheme} from '../../../utility/PastMatchCardStyle';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {setGameMode} from '../../../utility/SetGameMode';
import './tarjetaMatchesCompletos.css';

const MatchPrevio = ({prevMatch, teamId}) => {

    momentSpanishSetup();
    let ultimoMatch = prevMatch[0];

    const {number_of_games, league, serie, begin_at, winner_id, opponents, results, name} = ultimoMatch;
    const {classTeamA, classPointA, classTeamB, classPointB} = changeCardTheme(winner_id, teamId);
    const { guardarLogo, data } = useContext(HeaderLogoContext);
    const {opponentLogo, opponentName, ownLogo, ownName, opponentSlug} = setTeamLogo(opponents, teamId);
    const {A_point, B_point} = setMatchResult(results, teamId);
    const {modalidad} = setGameMode(number_of_games);

    useEffect(() => {
        if (ownLogo !== '') {
            guardarLogo(ownLogo);
        }  
    }, [ownLogo, guardarLogo]);
    //eslint-disable-next-line
    return(
        <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match"> 
            <div className="card-image waves-effect waves-block waves-light">
                <div className="card-image container-info cursor-default">
                    <div className="container-label">
                        <p className="label-teams" style={{color: data.vibrant}}>{name}</p>
                    </div> 
                    <div className="container-puntosYlogos">
                        <Link to={`/${opponentSlug}`}>
                            <div className={classTeamA}>                            
                                <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-team-logo-prev-match" src={opponentLogo}/>
                            </div> 
                        </Link>
                        <div>
                            <div className="points">
                                <p className={classPointA}>{A_point}</p>
                                <p>-</p>
                                <p className={classPointB}>{B_point}</p>                           
                            </div>  
                        </div>
                        <div className={classTeamB}>
                            <img alt="b team" className="max-size-team-logo-prev-match" src={ownLogo}/>
                        </div> 
                    </div>
                    <div className="container-label">
                        <p className="label-teams">{opponentName}</p> 
                        <p className="modalidad-past-match" style={{color: data.darkMuted}}>{modalidad}</p>
                        <p className="label-teams">{ownName}</p>
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