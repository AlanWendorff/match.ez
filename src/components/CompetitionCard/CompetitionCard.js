import React from 'react';
import { LOOKPROFILE, LOOKMATCHES } from '../../titlestag/titlestag';
import { faClock, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {setMatchResult} from '../../utility/SetMatchResult';
import {setGameMode} from '../../utility/SetGameMode';
import { PlaySound } from '../../utility/PlaySound';
import { Link } from 'react-router-dom';
import { TEAM } from '../../routes/routes';
import ProgressiveImage from 'react-progressive-image';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import toBeDefined from '../../Images/toBeDefined.png';
import './tarjetaMatchesCompletos.css';

const CompetitionCard = ({match, data}) => {

    const {opponents, league, begin_at, serie, number_of_games, tournament, status, official_stream_url, name, results} = match; 
    const dateUser = Moment(Date.now()).format("MM-DD-YYYY");
    const dateMatch = Moment(begin_at).format("MM-DD-YYYY");

    let aTeamName, aTeamId, aTeamLogo = "";
    let bTeamName, bTeamId, bTeamLogo = "";
    let fase = "";
    let statusStream = "Streaming off";
    let statusMatch = "Today " + Moment(begin_at).format('H:mm') + "hs";

    if (name.includes(":")) {
        fase = name.substring(
            name.lastIndexOf(0), 
            name.lastIndexOf(":")
        );
    }else{
        fase = tournament.name;
    }

    if (opponents.length !== 0) {
        if (opponents.length === 1) {
            aTeamName = opponents[0].opponent.name;
            aTeamId = opponents[0].opponent.id;
            if(opponents[0].opponent.image_url === null){
                aTeamLogo = csgoLogoDefaultBlack;
            }else{
                aTeamLogo = opponents[0].opponent.image_url;
            };
            bTeamName = "To be defined";
            bTeamLogo = toBeDefined;
        }else{
            aTeamName = opponents[0].opponent.name;
            aTeamId = opponents[0].opponent.id;
            bTeamName = opponents[1].opponent.name;
            bTeamId = opponents[1].opponent.id;
            opponents[0].opponent.image_url === null? aTeamLogo = csgoLogoDefaultBlack : aTeamLogo = opponents[0].opponent.image_url;
            opponents[1].opponent.image_url === null? bTeamLogo = csgoLogoDefaultBlack : bTeamLogo = opponents[1].opponent.image_url;
        }
    }else{
        aTeamName = "To be defined";
        aTeamLogo = toBeDefined;
        bTeamName = "To be defined";
        bTeamLogo = toBeDefined;
    }
    
    const {modalidad} = setGameMode(number_of_games);

    if (status === "running"){
        official_stream_url === null? statusStream = "PLAYING (no stream)" : statusStream = "LIVE";
        statusMatch = "¡Playing Now!";
        return (
            <div className="card posicion-tarjeta tamano-tarjeta-previo font-gilroy animate__animated animate__fadeInDown">
                <div className="col s12 m7 posicion-tarjeta">
                    <div className="card-image">
                        <div className="card-image container-info cursor-default padding-top-8">
                            <div className="live-league-container">
                                <a title={LOOKMATCHES + league.name} className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.url}> {league.name+" "+serie.full_name} </a>     
                            </div>
                            
                            <div className="live-container-puntos-logos-upcoming">

                                <Link to={TEAM.replace(':teamid', opponents[0].opponent.id)}>
                                    <div className="team-canvas"> 
                                    <ProgressiveImage src={opponents[0].opponent.image_url === null? csgoLogoDefaultBlack : opponents[0].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={LOOKPROFILE + opponents[0].opponent.name} alt="a team" className="size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                                    </ProgressiveImage>                          
                                    </div> 
                                </Link>

                                <div title="Partidos ganados en la serie">
                                    <div className="points" title="Partidos ganados en la serie">
                                        <p className="match-winner point-A">{results[0].score}</p>
                                        <p>-</p>
                                        <p className="match-winner point-B">{results[1].score}</p>                           
                                    </div>  
                                </div>

                                <Link to={TEAM.replace(':teamid', opponents[1].opponent.id)}>
                                    <div className="team-canvas">
                                        <ProgressiveImage src={opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={LOOKPROFILE + opponents[1].opponent.name} alt="b team" className="size-team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                        </ProgressiveImage>          
                                    </div> 
                                </Link>
                            </div>

                            <div className="container-label">
                                <p className="label-teams">{opponents[0].opponent.name}</p> 
                                <p className="modalidad-past-match" style={{color: data.darkMuted}}>{modalidad}</p>
                                <p className="label-teams">{opponents[1].opponent.name}</p>
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

                            <div className="card-action live-streaming-box-bottom-padding live-streaming-box-container" onClick={()=>{official_stream_url !== null&& PlaySound()}}>
                                <a className="stream-font-color-LIVE" rel="noopener noreferrer" target="_blank" href={official_stream_url}> {statusStream} <span className="dot-indicator"></span></a>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>   
            ); 
    }else{
        return(
            <div className="card posicion-tarjeta tamano-tarjeta-previo font-gilroy animate__animated animate__fadeInDown"> 
                <div className="card-image">
                    <p className="text-align-center cursor-default font-size mb-0">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}} title={LOOKMATCHES + league.name}>{league.name+" "+serie.full_name}</span> 
                    </p> 
                    <div className="card-image container-info cursor-default">

                        {dateUser === dateMatch?
                            <div className="hoy-esquina-container">
                                <p className="hoy-esquina">{fase}</p>
                                <p className="hoy-esquina">{statusMatch}</p> 
                            </div>
                        :
                            <div className="hoy-esquina-container">
                                <p className="labels-esquinas" >{fase}</p>
                                <p className="labels-esquinas">{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs</p> 
                            </div>
                        }
                        
    
                        <div className="container-puntosYlogos">

                            <Link to={aTeamName === "To be defined"? '/' : TEAM.replace(':teamid', aTeamId)}>
                                <div className="team-canvas">  
                                    <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={aTeamName !== "To be defined"? LOOKPROFILE + aTeamName : undefined} alt="a team" className="size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                                    </ProgressiveImage>                              
                                </div>
                            </Link>
    
                            <div className="versus-label">
                                <p>VS</p>           
                            </div>         

                            <Link to={bTeamName === "To be defined"? '/' : TEAM.replace(':teamid', bTeamId)}>
                                <div className="team-canvas">
                                    <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={bTeamName !== "To be defined"? LOOKPROFILE + bTeamName : undefined} alt="b team" className="size-team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                    </ProgressiveImage>    
                                </div> 
                            </Link>
                                
                        </div>
    
                        <div className="container-label">
                            <p className="label-teams">{aTeamName}</p> 
                            <p className="modalidad-past-match" style={{color: data.darkMuted}}>{modalidad}</p>
                            <p className="label-teams">{bTeamName}</p>
                        </div> 
                    </div>            
                
                </div>
            </div>
        );    
    }
}
 
export default CompetitionCard;