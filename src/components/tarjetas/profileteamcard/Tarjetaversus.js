import React, {useContext} from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setGameMode} from '../../../utility/SetGameMode';
import {setMatchResult} from '../../../utility/SetMatchResult';
import csgoLogoDefault from '../../../ImagenesVarias/csgoLogoDefault.png';
import toBeDefined from '../../../ImagenesVarias/toBeDefined.png';
import './tarjetaUpcomingMatch.css';

const Tarjetaversus = ({match, teamId}) => {

    const { data } = useContext(HeaderLogoContext);
    const {opponents, league, begin_at, name, serie, number_of_games, tournament, status, official_stream_url, results} = match; 
    momentSpanishSetup();

    let ArrteamA;
    let opponentLogo, opponentName, opponentSlug
    let bTeamLogo, bTeamName, bTeamSlug, bTeamId
    let hoy = "";
    let statusStream = "Streaming inactivo";
    let diaUsuario = new Date().getDate();
    let diaMatch = parseInt(Moment(begin_at).format('D'));

    if(opponents.length > 1){
        ArrteamA = opponents.find(element => element.opponent.id !== teamId);
        if (ArrteamA.opponent.image_url === null) {
            opponentLogo = csgoLogoDefault;
            opponentSlug  = ArrteamA.opponent.slug;
            opponentName = ArrteamA.opponent.name;
            bTeamId = ArrteamA.opponent.id;
            bTeamLogo = csgoLogoDefault;
        }else{
            opponentLogo = ArrteamA.opponent.image_url;
            bTeamLogo = ArrteamA.opponent.image_url;
            opponentName = ArrteamA.opponent.name;
            bTeamName = ArrteamA.opponent.name;
            opponentSlug  = ArrteamA.opponent.slug;
            bTeamSlug = ArrteamA.opponent.slug;
            bTeamId = ArrteamA.opponent.id;
        }
    }else{
        opponentLogo = toBeDefined;
    }

    const ArrteamB = opponents.find(element => element.opponent.id === teamId);
    const ownLogo = ArrteamB.opponent.image_url;
    const ownName = ArrteamB.opponent.name;

    const {modalidad} = setGameMode(number_of_games);

    if (diaUsuario === diaMatch){                                   // get day of the PC user and compare of the day match to show "Today!"
        hoy = "¡Hoy!";                                               
    }
    //eslint-disable-next-line

    if(status === 'running'){
        hoy = "¡Ahora!"; 
        statusStream = "Partido en vivo!";
        const {A_point, B_point} = setMatchResult(results, teamId); 
        return(
            <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy">
                <div className="col s12 m7 posicion-tarjeta">
                    <div className="card-image waves-effect waves-block waves-light">
                        <div className="card-image container-info cursor-default padding-top-8">

                            <div className="live-league-container">
                                <a className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.name}> {league.name+" "+serie.full_name} </a>     
                            </div>
                            
                            <div className="live-container-puntos-logos-upcoming">

                                <Link to ={`/${opponentSlug}`}>
                                    <div className="team-canvas outline-shade-black"> 
                                        <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefault}>
                                            {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-team-logo-prev-match animate__animated animate__fadeIn animate__fast" src={src} />}
                                        </ProgressiveImage>                        
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
                                    <ProgressiveImage src={ownLogo} placeholder={csgoLogoDefault}>
                                        {src => <img alt="b team" className="max-size-team-logo-prev-match animate__animated animate__fadeIn animate__fast" src={src} />}
                                    </ProgressiveImage>  
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
            <div className="col s12 m7 posicion-tarjeta font-gilroy">
                <div className="card horizontal tamano-tarjeta">

                    <div className="card-image lienzo-logo"> 
                        <Link to ={`/${opponentSlug}`}> 
                        <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefault}>
                            {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="versus team" className="max-size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                        </ProgressiveImage>
                        </Link>
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            
                            <a className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.name}> {league.name+" "+serie.full_name} </a>
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