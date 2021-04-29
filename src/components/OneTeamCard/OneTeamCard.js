import React, {useContext} from 'react';
import { LOOKPROFILE,  LOOKMATCHES } from '../../titlestag/titlestag';
import { faClock, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import { HeaderLogoContext } from '../Context/HeaderLogoContext'
import { TOURNAMENT, TEAM } from '../../routes/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePalette } from 'react-palette';
import { PlaySound } from '../../utility/PlaySound';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import Share from '../Share/Share';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import toBeDefined from '../../Images/toBeDefined.png';
import './tarjetaUpcomingMatch.css';

const OneTeamCard = ({match, teamid}) => {

    const { data } = useContext(HeaderLogoContext);
    const {opponents, league, begin_at, stage, serie, bestOf, tournament, status, official_stream_url, results} = match; 

    let ownLogo, ownName;
    let opponentLogo, opponentName, opponentId;
    let proxyLogo;
    let hoy = "";
    let statusStream = "Streaming off";
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

    const opponentArray = opponents.find(element => element.opponent.id !== parseInt(teamid));
    const { opponent } = opponentArray;
    if (opponent) {
        opponentLogo = opponent.image_url === null? csgoLogoDefaultBlack : opponent.image_url;
        opponentName = opponent.name;
        opponentId = opponent.id;
    }else{
        opponentLogo = toBeDefined;
    }
    
    const profileOpoonentArray = opponents.find(element => element.opponent.id === parseInt(teamid));
    ownLogo = profileOpoonentArray.image_url === null? csgoLogoDefaultBlack : profileOpoonentArray.image_url;
    ownName = profileOpoonentArray.name;

    if (diaUsuario === diaMatch){                                   // get day of the PC user and compare of the day match to show "Today!"
        hoy = "¡Today!";                                               
    }

    const Facebook = 
    `${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName}
    ${bestOf}
    ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs 
    ${league.name +" "+ serie.full_name}
    `;
    const Twitter =`${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName} | ${bestOf} | ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs | ${league.name+" "+serie.full_name}`;
    const Wapp = `${opponentName === undefined? 'To be defined' : opponentName} VS ${ownName} | ${bestOf} | ${Moment(begin_at).format('Do')} ${Moment(begin_at).format('MMMM - H:mm')} hs | ${league.name +" "+ serie.full_name} -> ${window.location.href}`;
    

    if(status === 'running'){
        hoy = "Playing Now"; 
        official_stream_url === null? statusStream = "PLAYING (no stream)" : statusStream = "LIVE";
        return(
            <div className={`card posicion-tarjeta tamano-tarjeta-previo font-gilroy animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>
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
                                            {src => <img title={LOOKPROFILE + opponents[0].opponent.name} alt="a team" className="team-logo" src={src} />}
                                        </ProgressiveImage>                        
                                    </div> 
                                </Link>

                                <div title="Partidos ganados en la serie">
                                    <div className="points font-gilroy-bold">
                                        <p className="match-winner point-A">{results[0].score}</p>
                                        <p>-</p>
                                        <p className="match-winner point-B">{results[1].score}</p>                           
                                    </div>  
                                </div>
                                <Link to={TEAM.replace(':teamid', opponents[1].opponent.id)} >
                                    <div className="team-canvas">
                                        <ProgressiveImage src={opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                            {src => <img title={LOOKPROFILE + opponents[1].opponent.name} alt="b team" className="team-logo" src={src} />}
                                        </ProgressiveImage>  
                                    </div> 
                                </Link>
                            </div>

                            <div className="container-label">
                                <p className="label-teams">{opponents[0].opponent.name}</p> 
                                <p className="modalidad-past-match">{bestOf}</p>
                                <p className="label-teams">{opponents[1].opponent.name}</p>
                            </div> 


                            <div className="match-data">
                                <span className="font-size text-align-start">
                                    <span style={{color: data.darkVibrant}}><FontAwesomeIcon className="turn-left-90" icon={faCodeBranch}/></span> 
                                    <span className="data">{stage}</span> 
                                </span>

                                <span className="font-size align-end">
                                    <span style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faClock}/>  </span>
                                    <span className="data">{Moment(begin_at).format('H:mm')}  hs</span> 
                                </span>                  
                            </div>

                            <a className="card-action live-streaming-box-bottom-padding live-streaming-box-container"  rel="noopener noreferrer" target="_blank" href={official_stream_url} onClick={()=>{official_stream_url !== null&& PlaySound()}}> 
                                <span className="stream-font-color-LIVE"> {statusStream} <span className="dot-indicator"></span></span>
                            </a>
                        </div>              
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className={`col s12 m7 posicion-tarjeta font-gilroy animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>
                <div className="card horizontal tamano-tarjeta" style={{border: `5px solid ${leagueColors.lightVibrant}`}}>
                    <div className="card-image lienzo-logo"> 
                        <Link to={opponentName !== undefined&& TEAM.replace(':teamid', opponentId)} > 
                            <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                {src => <img title={opponentName !== undefined&& LOOKPROFILE + opponentName} alt="versus team" className="max-size-team-logo"  src={src} />}
                            </ProgressiveImage>
                        </Link>
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            <Link className="text-center head-font highlight-text font-gilroy-bold" style={{color: leagueColors.darkVibrant}}  to={TOURNAMENT.replace(':tournamentId', tournament.league_id)} title={LOOKMATCHES + league.name} > {league.name+" "+serie.full_name} </Link>
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style mr-3px font-gilroy-bold" style={{color: leagueColors.darkVibrant}}>Vs:</span> 
                                {opponentName === undefined? 'To be defined' : opponentName}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style mr-3px font-gilroy-bold" style={{color: leagueColors.darkVibrant}}>Stage:</span> 
                                {stage}
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style font-gilroy-bold" style={{color: leagueColors.darkVibrant}}>Date: </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs  <span className="hoy-color">{hoy}</span> </span> 
                            </p>
                                
                            <p className="text-align cursor-default font-size">
                                <span className="label-data-style mr-3px font-gilroy-bold" style={{color: leagueColors.darkVibrant}}>Games:</span> 
                                {bestOf}
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