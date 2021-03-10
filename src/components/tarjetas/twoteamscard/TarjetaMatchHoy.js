import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../../ImagenesVarias/csgoLogoDefaultBlack.png';
import toBeDefined from '../../../ImagenesVarias/toBeDefined.png';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setGameMode} from '../../../utility/SetGameMode';

import './tarjetaMatchesCompletos.css';

const TarjetaMatchHoy = ({matchHoy, data}) => {
    const {opponents, league, begin_at, serie, number_of_games, tournament, status, official_stream_url, name, results} = matchHoy; 
    momentSpanishSetup();
    const dateUser = Moment(Date.now()).format("MM-DD-YYYY");
    const dateMatch = Moment(begin_at).format("MM-DD-YYYY");
    let aTeamSlug = "";
    let bTeamSlug = "";
    let aTeamName = "";
    let bTeamName = "";
    let aTeamLogo = "";
    let bTeamLogo = "";
    let bTeamId = "";
    let fase = "";
    let statusStream = "Streaming inactivo";
    let statusMatch = "¡Hoy " + Moment(begin_at).format('H:mm') + "hs!";

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
            if(opponents[0].opponent.image_url === null){
                aTeamLogo = csgoLogoDefaultBlack;
            }else{
                aTeamLogo = opponents[0].opponent.image_url;
            };
            bTeamName = "a definir";
            bTeamLogo = toBeDefined;
        }else{
            aTeamName = opponents[0].opponent.name;
            aTeamSlug = opponents[0].opponent.slug;
            bTeamName = opponents[1].opponent.name;
            bTeamSlug = opponents[1].opponent.slug;
            bTeamId = opponents[1].opponent.id;
            if(opponents[0].opponent.image_url === null || undefined){
                aTeamLogo = csgoLogoDefaultBlack;
            }else{
                aTeamLogo = opponents[0].opponent.image_url;
            };
            if(opponents[1].opponent.image_url === null){
                bTeamLogo = csgoLogoDefaultBlack;
            }else{
                bTeamLogo = opponents[1].opponent.image_url;
            };
        }
    }else{
        aTeamName = "a definir";
        aTeamLogo = toBeDefined;
        bTeamName = "a definir";
        bTeamLogo = toBeDefined;
    }

    const {modalidad} = setGameMode(number_of_games);

    if (status === "running"){                                  // if the status is running the status stream change to "Stream in live!"
        statusStream = "Partido en vivo!";
        statusMatch = "¡Ahora!";
    }

    if (dateUser === dateMatch || status === "running"){ 
        if (status === "running"){
            const {A_point, B_point} = setMatchResult(results, bTeamId); 
            return (
                <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy">
                    <div className="col s12 m7 posicion-tarjeta">
                        <div className="card-image waves-effect waves-block waves-light">
                            <div className="card-image container-info cursor-default padding-top-8">
                                <div className="live-league-container">
                                    <a className="text-center head-font highlight-text" style={{color: data.vibrant}} rel="noopener noreferrer" target="_blank" href={league.url}> {league.name+" "+serie.full_name} </a>     
                                </div>
                                
                                <div className="live-container-puntos-logos-upcoming">
    
                                    <Link to={aTeamSlug === "null"? '/' : `/${aTeamSlug}`}>
                                        <div className="team-canvas"> 
                                        <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                                        </ProgressiveImage>                          
                                        </div> 
                                    </Link>
    
                                    <div title="Partidos ganados en la serie">
                                        <div className="points" title="Partidos ganados en la serie">
                                            <p className="match-winner point-A">{A_point}</p>
                                            <p>-</p>
                                            <p className="match-winner point-B">{B_point}</p>                           
                                        </div>  
                                    </div>
    
                                    <Link to={aTeamSlug === "null"? '/' : `/${bTeamSlug}`}>
                                        <div className="team-canvas">
                                            <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="size-team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                            </ProgressiveImage>          
                                        </div> 
                                    </Link>
                                </div>
    
                                <div className="container-label">
                                    <p className="label-teams">{aTeamName}</p> 
                                    <p className="modalidad-past-match" style={{color: data.darkMuted}}>{modalidad}</p>
                                    <p className="label-teams">{bTeamName}</p>
                                </div> 
    
    
                                <div className="live-container-info-bottom">
                                    <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>Fase:</span> 
                                        {fase}
                                    </p>
    
                                    <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>Empezó: </span>
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
                <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy"> 
                    <div className="card-image waves-effect waves-block waves-light">
                        <p className="text-align-center cursor-default font-size mb-0">
                            <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>{league.name+" "+serie.full_name}</span> 
                        </p> 
                        <div className="card-image container-info cursor-default">
                            <div className="hoy-esquina-container">
                                <p className="hoy-esquina">{fase}</p>
                                <p className="hoy-esquina">{statusMatch}</p> 
                            </div>
        
                            <div className="container-puntosYlogos">

                                <Link to={aTeamSlug === "null"? '/' : `/${aTeamSlug}`}>
                                    <div className="team-canvas">  
                                        <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                                        </ProgressiveImage>                              
                                    </div>
                                </Link>
        
                                <div className="versus-label">
                                    <p>VS</p>           
                                </div>         

                                <Link to={aTeamSlug === "null"? '/' : `/${bTeamSlug}`}>
                                    <div className="team-canvas">
                                        <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="size-team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
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
    }else{
        return (
            <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy"> 
                <div className="card-image waves-effect waves-block waves-light">
                    <p className="text-align-center cursor-default font-size mb-0">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.vibrant}}>{league.name+" "+serie.full_name}</span> 
                    </p> 
                    <div className="card-image container-info cursor-default">
                        
                        <div className="hoy-esquina-container">
                            <p className="labels-esquinas">{fase}</p>
                            <p className="labels-esquinas">{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs</p> 
                        </div>

                        <div className="container-puntosYlogos">

                            <Link to={aTeamSlug === "null"? '/' : `/${aTeamSlug}`}>
                                <div className="team-canvas">          
                                    <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                                    </ProgressiveImage>                       
                                </div>
                            </Link>
       
                            <div className="versus-label">
                                <p>VS</p>           
                            </div>         

                            <Link to={aTeamSlug === "null"? '/' : `/${bTeamSlug}`}>
                                <div className="team-canvas">
                                    <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="size-team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
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
 
export default TarjetaMatchHoy;