import React, {useContext, useEffect} from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import { TournamentContext } from '../../context/TournamentContext'
import { PathContext } from '../../context/PathContext';
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setGameMode} from '../../../utility/SetGameMode';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {setNewTournament} from '../../../utility/FirebaseSetNewTournament';
import {setNewTeamPath} from '../../../utility/FirebaseSetNewTeamPath';
import csgoLogoDefault from '../../../ImagenesVarias/csgoLogoDefault.png';
import toBeDefined from '../../../ImagenesVarias/toBeDefined.png';
import './tarjetaUpcomingMatch.css';

const Tarjetaversus = ({match, teamId}) => {

    const { data } = useContext(HeaderLogoContext);
    const { tournamentId, database } = useContext(TournamentContext);
    const { paths } = useContext(PathContext);
    const {opponents, league, begin_at, name, serie, number_of_games, tournament, status, official_stream_url, results} = match; 
    
    momentSpanishSetup();

    let ownName = "";
    let ownLogo = "";
    let opponentName, bTeamName = "";
    let opponentSlug, bTeamSlug = "";
    let opponentLogo, bTeamLogo = "";
    let bTeamId = "";
    let hoy = "";
    let statusStream = "Streaming inactivo";
    let diaUsuario = new Date().getDate();
    let diaMatch = parseInt(Moment(begin_at).format('D'));

    const {modalidad} = setGameMode(number_of_games);

    for (let i=0; i< opponents.length; i++){                        // get EVER the opponent team logo (pandascore object index of opponent logo team are irregular)
        if (opponents[i].opponent.id !== teamId){
            if(opponents[i].opponent.image_url === null){
                opponentLogo = csgoLogoDefault;
                opponentSlug = opponents[i].opponent.slug;
                bTeamId = opponents[i].opponent.id;
                bTeamName = opponents[i].opponent.name;
                bTeamLogo = opponentLogo;
            }else{
                opponentLogo = opponents[i].opponent.image_url;
                opponentSlug = opponents[i].opponent.slug;
                opponentName = opponents[i].opponent.name;
                bTeamId = opponents[i].opponent.id;
                bTeamName = opponents[i].opponent.name;
                bTeamLogo = opponents[i].opponent.image_url;
            }  
        }else{
            ownName = opponents[i].opponent.name;
            ownLogo = opponents[i].opponent.image_url;
        }
        if(opponents.length === 1){
            opponentLogo = toBeDefined;
        }
    };

    if (diaUsuario === diaMatch){                                   // get day of the PC user and compare of the day match to show "Today!"
        hoy = "¡Hoy!";                                               
    }
    bTeamSlug = opponentSlug;
    useEffect(() => {
        if (opponentLogo !== toBeDefined) {
            setNewTeamPath(bTeamSlug, bTeamId, bTeamName, bTeamLogo, database, paths); 
        }
        setNewTournament(league, tournamentId, database);
    }, [bTeamSlug, bTeamId, bTeamLogo, bTeamName, opponentLogo, database, paths, league, tournamentId]); 
    //eslint-disable-next-line

    if(status === 'running'){
        hoy = "¡Ahora!"; 
        statusStream = "Partido en vivo!";
        const {A_point, B_point} = setMatchResult(results, teamId); 
        return(
            <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match">
                <div className="col s12 m7 posicion-tarjeta">
                    <div className="card-image waves-effect waves-block waves-light">
                        <div className="card-image container-info cursor-default padding-top-8">

                            <div className="live-league-container">
                                <img alt="League Logo" className="league-size text-center mr" src={league.image_url}/>
                                <a className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.url}> {league.name+" "+serie.full_name} </a>     
                            </div>
                            
                            <div className="live-container-puntos-logos-upcoming">

                                <Link to ={`/${opponentSlug}`}>
                                    <div className="team-canvas outline-shade-black">                            
                                        <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-team-logo-prev-match" src={opponentLogo}/>
                                    </div> 
                                </Link>

                                <div title="Partidos ganados en la serie">
                                    <div className="points">
                                        <p className="match-winner point-A">{A_point}</p>
                                        <p>-</p>
                                        <p className="match-winner point-B">{B_point}</p>                           
                                    </div>  
                                </div>

                                <div className="team-canvas outline-shade-black">
                                    <img alt="b team" className="max-size-team-logo-prev-match" src={ownLogo}/>
                                </div> 
                            </div>

                            <div className="container-label">
                                <p className="label-teams">{opponentName}</p> 
                                <p className="modalidad-past-match">{modalidad}</p>
                                <p className="label-teams">{ownName}</p>
                            </div> 


                            <div className="live-container-info-bottom">
                                <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                    <span className="label-data-style margin-entre-label-contenid" style={{color: data.vibrant}}>Fase:</span> 
                                    {tournament.name}
                                </p>

                                <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                    <span className="label-data-style margin-entre-label-contenid" style={{color: data.vibrant}}>Empezó: </span>
                                    <span>{Moment(begin_at).format('H:mm')}  hs</span> 
                                </p>                  
                            </div>

                            <div className="card-action live-streaming-box-bottom-padding live-streaming-box-container"> 
                                <a className="stream-font-color-LIVE" rel="noopener noreferrer" target="_blank" href={official_stream_url}> {statusStream} <span className="dot-indicator"></span></a>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className="col s12 m7 posicion-tarjeta">
                <div className="card horizontal tamano-tarjeta">

                    <div className="card-image lienzo-logo"> 
                        <Link to ={`/${opponentSlug}`}> 
                            <img title={`Click para ver el perfil de ${opponentName}`} alt="versus team" className="max-size-team-logo" src={opponentLogo}/> 
                        </Link>
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            
                            <a className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.url}> {league.name+" "+serie.full_name} </a>
                            <p className="text-center cursor-default font-size mb-8">{name}</p>
                            
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid" style={{color: data.vibrant}}>Fase:</span> 
                                {tournament.name}
                            </p>
                            
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid" style={{color: data.vibrant}}>Fecha: </span>
                                <span>{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs  <span className="hoy-color">{hoy}</span> </span> 
                            </p>
                            
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid" style={{color: data.vibrant}}>Modalidad:</span> 
                                {modalidad}
                            </p>
                        
                        </div>
    
                        <div className="card-action padding-streaming-box">
                            <span className="cursor-default" style={{color: data.vibrant}}>{statusStream}</span>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tarjetaversus;

/*





*/