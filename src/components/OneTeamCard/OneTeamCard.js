import React, {useContext} from 'react';
import { LOOKPROFILE,  LOOKMATCHES } from '../../titlestag/titlestag';
import { faClock, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import { HeaderLogoContext } from '../Context/HeaderLogoContext'
import { TOURNAMENT, TEAM } from '../../routes/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setGameMode } from '../../utility/SetGameMode';
import { usePalette } from 'react-palette';
import { PlaySound } from '../../utility/PlaySound';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import TeamRanking from "../TeamRanking/TeamRanking";
import Share from '../Share/Share';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import toBeDefined from '../../Images/toBeDefined.png';
import './tarjetaUpcomingMatch.css';

const OneTeamCard = ({match, teamid}) => {

    const { data } = useContext(HeaderLogoContext);
    const {opponents, league, begin_at, name, serie, number_of_games, tournament, status, official_stream_url, results} = match; 

    let ownLogo;
    let ownName;
    let proxyLogo;
    let opponentLogo, opponentName, opponentId, opponentSlug;
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
        if (opponents[0].opponent.id !== parseInt(teamid)) {
            opponentLogo = opponents[0].opponent.image_url === null? csgoLogoDefaultBlack : opponents[0].opponent.image_url;
            opponentSlug  = opponents[0].opponent.slug;
            opponentName = opponents[0].opponent.name;
            opponentId = opponents[0].opponent.id;
        }else{
            opponentLogo = opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url;
            opponentSlug  = opponents[1].opponent.slug;
            opponentName = opponents[1].opponent.name;
            opponentId = opponents[1].opponent.id;
        }
    }else{
        opponentLogo = toBeDefined;
    }

    
    if (opponents[0].opponent.id === parseInt(teamid)) {
        ownLogo = opponents[0].opponent.image_url;
        ownName = opponents[0].opponent.name;
    }else{
        ownLogo = opponents[1].opponent.image_url;
        ownName = opponents[1].opponent.name;
    }

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
        official_stream_url === null? statusStream = "PLAYING (no stream)" : statusStream = "LIVE";
        return(
            <div className="card posicion-tarjeta tamano-tarjeta-previo font-gilroy animate__animated animate__fadeInDown animate__faster">
                <div className="col s12 m7 posicion-tarjeta" style={{border: `5px solid ${leagueColors.lightVibrant}`}}>
                    <div className="card-image">
                        <div className="card-image container-info cursor-default padding-top-8">

                            <div className="live-league-container">
                                <Link className="text-center head-font highlight-text" style={{color: `${leagueColors.darkVibrant}`}} to={TOURNAMENT.replace(':tournamentId', tournament.league_id)} title={LOOKMATCHES + league.name}> {league.name+" "+serie.full_name} </Link>     
                            </div>
                            
                            <div className="live-container-puntos-logos-upcoming">

                                <Link to={TEAM.replace(':teamid', opponents[0].opponent.id)} >
                                    <div className="team-canvas"> 
                                        <ProgressiveImage src={opponents[0].opponent.image_url === null? csgoLogoDefaultBlack : opponents[0].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={LOOKPROFILE + opponents[0].opponent.name} alt="a team" className="team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                        </ProgressiveImage>                        
                                    </div> 
                                </Link>

                                <div title="Partidos ganados en la serie">
                                    <div className="points">
                                        <p className="match-winner point-A">{results[0].score}</p>
                                        <p>-</p>
                                        <p className="match-winner point-B">{results[1].score}</p>                           
                                    </div>  
                                </div>
                                <Link to={TEAM.replace(':teamid', opponents[1].opponent.id)} >
                                    <div className="team-canvas">
                                        <ProgressiveImage src={opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={LOOKPROFILE + opponents[1].opponent.name} alt="b team" className="team-logo animate__animated animate__fadeIn animate__fast" src={src} />}
                                        </ProgressiveImage>  
                                    </div> 
                                </Link>
                            </div>

                            <div className="container-label">
                                <p className="label-teams">{opponents[0].opponent.name}</p> 
                                <p className="modalidad-past-match">{modalidad}</p>
                                <p className="label-teams">{opponents[1].opponent.name}</p>
                            </div> 


                            <div className="match-data">
                                <span className="font-size text-align-start">
                                    <span style={{color: data.darkVibrant}}><FontAwesomeIcon className="turn-left-90" icon={faCodeBranch}/></span> 
                                    <span className="data">{fase}</span> 
                                </span>

                                <span className="font-size align-end">
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
            <div className="col s12 m7 posicion-tarjeta font-gilroy animate__animated animate__fadeInDown animate__faster">
                <div className="card horizontal tamano-tarjeta" style={{border: `5px solid ${leagueColors.lightVibrant}`}}>
                    <div className="card-image lienzo-logo"> 
                        <Link to={opponentName !== undefined&& TEAM.replace(':teamid', opponentId)} > 
                            <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                {src => <img title={opponentName !== undefined&& LOOKPROFILE + opponentName} alt="versus team" className="max-size-team-logo animate__animated animate__fadeIn animate__fast"  src={src} />}
                            </ProgressiveImage>
                        </Link>
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            <Link className="text-center head-font highlight-text" style={{color: leagueColors.darkVibrant}}  to={TOURNAMENT.replace(':tournamentId', tournament.league_id)} title={LOOKMATCHES + league.name} > {league.name+" "+serie.full_name} </Link>
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: leagueColors.darkVibrant}}>Vs:</span> 
                                {opponentName === undefined? 'To be defined' : opponentName}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: leagueColors.darkVibrant}}>Stage:</span> 
                                {fase}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid" style={{color: leagueColors.darkVibrant}}>Date: </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs  <span className="hoy-color">{hoy}</span> </span> 
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style margin-entre-label-contenid mr-3px" style={{color: leagueColors.darkVibrant}}>Games:</span> 
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

export default OneTeamCard;