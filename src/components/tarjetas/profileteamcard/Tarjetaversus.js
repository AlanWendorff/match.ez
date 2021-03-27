import React, {useContext} from 'react';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setGameMode} from '../../../utility/SetGameMode';
import {setMatchResult} from '../../../utility/SetMatchResult';
import csgoLogoDefaultBlack from '../../../ImagenesVarias/csgoLogoDefaultBlack.png';
import toBeDefined from '../../../ImagenesVarias/toBeDefined.png';
import { usePalette } from 'react-palette';
import Share from '../../share/Share';
import './tarjetaUpcomingMatch.css';

const Tarjetaversus = ({match, teamId}) => {

    const { data } = useContext(HeaderLogoContext);
    const {opponents, league, begin_at, name, serie, number_of_games, tournament, status, official_stream_url, results} = match; 
    //momentSpanishSetup();

    let proxyLogo;
    let ArrteamA;
    let opponentLogo, opponentName, opponentSlug;
    let hoy = "";
    let statusStream = "Streaming off";
    let fase = "";
    let diaUsuario = new Date().getDate();
    let diaMatch = parseInt(Moment(begin_at).format('D'));
    if (league.image_url !== null && league.image_url !== csgoLogoDefaultBlack) proxyLogo = 'https://proxy-kremowy.herokuapp.com/' + league.image_url;
    let error = usePalette(proxyLogo).error;
    let leagueColors = usePalette(proxyLogo).data;
    if (error) {
        leagueColors = {
            darkMuted: "#1c313a",
            darkVibrant: "#455a64",
            lightMuted: "#455a64",
            lightVibrant: "#718792",
            muted: "#1c313a",
            vibrant: "#718792",
        }
    }
    if (name.includes(":")) {
        fase = name.substring(
            name.lastIndexOf(0), 
            name.lastIndexOf(":")
        );
    }else{
        fase = tournament.name;
    }

    if(opponents.length > 1){
        ArrteamA = opponents.find(element => element.opponent.id !== teamId);
        if (ArrteamA.opponent.image_url === null) {
            opponentLogo = csgoLogoDefaultBlack;
            opponentSlug  = ArrteamA.opponent.slug;
            opponentName = ArrteamA.opponent.name;
        }else{
            opponentLogo = ArrteamA.opponent.image_url;
            opponentName = ArrteamA.opponent.name;
            opponentSlug  = ArrteamA.opponent.slug;
        }
    }else{
        opponentLogo = toBeDefined;
    }

    const ArrteamB = opponents.find(element => element.opponent.id === teamId);
    const ownLogo = ArrteamB.opponent.image_url;
    const ownName = ArrteamB.opponent.name;
    const {modalidad} = setGameMode(number_of_games);

    if (diaUsuario === diaMatch){                                   // get day of the PC user and compare of the day match to show "Today!"
        hoy = "¡Today!";                                               
    }

    const Facebook = 
    `${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName}
    ${modalidad}
    ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs 
    ${league.name +" "+ serie.full_name}
    `;
    const Twitter =`${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName} | ${modalidad} | ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs | ${league.name+" "+serie.full_name}`;
    const Wapp = `${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName} | ${modalidad} | ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs | ${league.name +" "+ serie.full_name} -> ${window.location.href}`;
    

    if(status === 'running'){
        hoy = "Playing Now"; 
        statusStream = "LIVE";
        const {A_point, B_point} = setMatchResult(results, teamId); 
        return(
            <div className="card posicion-tarjeta tamano-tarjeta-previo font-gilroy animate__animated animate__fadeInDown animate__faster">
                <div className="col s12 m7 posicion-tarjeta" style={{border: `5px solid ${leagueColors.lightVibrant}`}}>
                    <div className="card-image">
                        <div className="card-image container-info cursor-default padding-top-8">

                            <div className="live-league-container">
                                <a className="text-center head-font highlight-text" style={{color: `${leagueColors.darkVibrant}`}} rel="noopener noreferrer" target="_blank" href={league.slug}> {league.name+" "+serie.full_name} </a>     
                            </div>
                            
                            <div className="live-container-puntos-logos-upcoming">

                                <Link to ={`/${opponentSlug}`}>
                                    <div className="team-canvas"> 
                                        <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
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

                                <div className="team-canvas">
                                    <ProgressiveImage src={ownLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img alt="b team" className="team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                    </ProgressiveImage>  
                                </div> 
                            </div>

                            <div className="container-label">
                                <p className="label-teams">{opponentName}</p> 
                                <p className="modalidad-past-match">{modalidad}</p>
                                <p className="label-teams">{ownName}</p>
                            </div> 


                            <div className="match-data">
                                <span className="font-size">
                                    <span style={{color: data.darkVibrant}}><FontAwesomeIcon className="turn-left-90" icon={faCodeBranch}/></span> 
                                    <span className="data">{fase}</span> 
                                </span>

                                <span className="font-size">
                                    <span style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faClock}/>  </span>
                                    <span className="data">{Moment(begin_at).format('H:mm')}  hs</span> 
                                </span>                  
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
            <div className="col s12 m7 posicion-tarjeta font-gilroy animate__animated animate__fadeInDown animate__faster">
                <div className="card horizontal tamano-tarjeta" style={{border: `5px solid ${leagueColors.lightVibrant}`}}>
                    <div className="card-image lienzo-logo"> 
                        <Link to ={`/${opponentSlug}`}> 
                            <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="versus team" className="max-size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                            </ProgressiveImage>
                        </Link>
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            <a className="text-center head-font highlight-text" style={{color: `${leagueColors.darkVibrant}`}} rel="noopener noreferrer" target="_blank" href={league.slug}> {league.name+" "+serie.full_name} </a>
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: data.darkVibrant}}>Vs:</span> 
                                {opponentName === undefined? 'a definir' : opponentName}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: data.darkVibrant}}>Stage:</span> 
                                {fase}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid" style={{color: data.darkVibrant}}>Date: </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs  <span className="hoy-color">{hoy}</span> </span> 
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: data.darkVibrant}}>Games:</span> 
                                {modalidad}
                            </p>
                            <Share
                                Facebook={Facebook}
                                Twitter={Twitter}
                                Wapp={Wapp}
                            />
                        </div>
    
                        <div className="card-action padding-streaming-box">
                            <span className="cursor-default" style={{color: data.darkVibrant}}>{statusStream}</span>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tarjetaversus;