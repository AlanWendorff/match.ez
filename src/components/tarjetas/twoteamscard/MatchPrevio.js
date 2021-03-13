import React, {useContext, useState, Fragment} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import { Link } from 'react-router-dom';
import ScoreTarjeta from './matchStadistic/ScoreTarjeta';
import ProgressiveImage from 'react-progressive-image';
import csgoLogoDefaultBlack from '../../../ImagenesVarias/csgoLogoDefaultBlack.png';
import Moment from 'moment';
import Share from '../../share/Share';
import {momentSpanishSetup} from '../../../utility/MomentSpanishSetup';
import {setTeamLogo} from '../../../utility/SetTeamLogo';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {setGameMode} from '../../../utility/SetGameMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';
import { usePalette } from 'react-palette';

import './tarjetaMatchesCompletos.css';
import './matchprevio.css';

const MatchPrevio = ({match, teamId, scoreMatch, setDropList, droplist, allMatch, oneMatch, firstIndexDate}) => {
    momentSpanishSetup();
    const {teams} = scoreMatch;
    let proxyLogo;
    //onClick={ store.addNotification(oneMatch) }
    const [sizecard, setSizeCard] = useState();
    const {number_of_games, league, serie, tournament, begin_at, id, winner_id, opponents, results, name} = match;
    const { data } = useContext(HeaderLogoContext);
    const {opponentLogo, opponentName, ownLogo, ownName, opponentSlug, csgoLogoDefault} = setTeamLogo(opponents, teamId);
    const {A_point, B_point} = setMatchResult(results, teamId);
    const {modalidad} = setGameMode(number_of_games);

    if (league.image_url !== null && league.image_url !== csgoLogoDefault) proxyLogo = 'https://proxy-kremowy.herokuapp.com/' + league.image_url;
    let error = usePalette(proxyLogo).error;
    let leagueColors = usePalette(proxyLogo).data;
    let fase = "";
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
    const Facebook = 
    `${opponentName}: ${A_point} 
    ${ownName}: ${B_point}  
    ${league.name +" "+ serie.full_name}
    `;
    const Twitter = `${opponentName}: ${A_point} VS ${ownName}: ${B_point} | ${league.name+" "+serie.full_name}`;
    const Wapp = `${opponentName}: ${A_point} VS ${ownName}: ${B_point} |  ${league.name +" "+ serie.full_name} -> ${window.location.href}`;
    
    //eslint-disable-next-line
    return(
        <div className="noselect card posicion-tarjeta size-prev-game container-gen-prev-game font-gilroy transition-effect position-relative" style={sizecard}> 
            {id === firstIndexDate?
                <div onClick={() => {
                    if (droplist) {
                        setDropList(false);
                        store.addNotification(oneMatch);
                    }else{
                        setDropList(true);
                        store.addNotification(allMatch);
                    }}}
                className="drop-container" style={{backgroundColor: data.darkVibrant}}><FontAwesomeIcon className="color-text-white mr" icon={droplist? faChevronDown : faChevronUp}/></div>
            :
                null
            }
            
            <div className="card-image" style={{borderTop: `5px solid ${leagueColors.lightVibrant}`}}>
                <div className="card-image prev-game-content cursor-default">
                    <div className="prev-game-header-container">
                        <p className="prev-game-header" style={{color: data.darkMuted}}>{fase}</p>
                    </div> 

                    <div className="prev-game-desktop">
                        <div className="team-column">
                            <Link to={`/${opponentSlug}`}>
                                <div className={winner_id === teamId? "match-loser-prevgame" :"match-winner-prevgame"}>                            
                                    <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                    </ProgressiveImage>
                                </div> 
                            </Link>

                            <p className="name-of-teams">{opponentName}</p> 
                        </div>

                        <div>
                            <div className="game-win">
                                <p className={winner_id === teamId? "match-loser point-A" :"match-winner point-A"}>{A_point}</p>
                                <p>-</p>
                                <p className={winner_id === teamId? "match-winner point-B" : "match-loser point-B"}>{B_point}</p>                           
                            </div> 

                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div>

                        <div className="team-column">
                            <div className={winner_id === teamId? "match-winner-prevgame" :"match-loser-prevgame"}>
                                <ProgressiveImage src={ownLogo} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img  alt="b team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                </ProgressiveImage>
                            </div> 
                            <p className="name-of-teams">{ownName}</p> 
                        </div>
                    </div>


                    <div className="prev-game-mobile">
                        <div className="row-team-name-gamewin">
                            <div className={winner_id === teamId? "match-loser" :"match-winner"}>                            
                                <ProgressiveImage src={opponentLogo} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img title={`Click para ver el perfil de ${opponentName}`} alt="a team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                </ProgressiveImage>
                            </div> 
                            <p className={winner_id === teamId? "match-loser" :"match-winner"}>{opponentName}</p> 
                            <p className={winner_id === teamId? "match-loser point-A" :"match-winner point-A"}>{A_point}</p>
                        </div>

                        <div className="row-team-name-gamewin">
                            <div className={winner_id === teamId? "match-winner" : "match-loser"}>                            
                                <ProgressiveImage src={ownLogo} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img  alt="b team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                </ProgressiveImage> 
                            </div> 
                            <p className={winner_id === teamId? "match-winner" :"match-loser"}>{ownName}</p>
                            <p className={winner_id === teamId? "match-winner point-B" : "match-loser point-B"}>{B_point}</p>
                        </div>

                        <div className="text-in-card">
                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div> 
                    </div>
                </div>            
            </div>

            {id === firstIndexDate?
                <Fragment>
                    <div className="card-content click-more-info activator cursor-pointer" 
                    onClick={()=>{ 
                        if (teams && teams.length > 0) {
                            if (window.innerWidth > 770) {
                                setSizeCard({height: "750px", overflow: "hidden"});
                            }else{
                                setSizeCard({height: "650px"});
                            }
                        }
                        }}>
                        <span className="head-font" style={{color: data.darkMuted}}><i className="material-icons right">info</i></span>
                    </div>
                    <div className="card-reveal">
                        <div className="card-title grey-text text-darken-4" >
                            <i className="material-icons right" onClick={()=>{ 
                                if (teams && teams.length > 0) {
                                    if (window.innerWidth > 770) {
                                        setSizeCard({height: "297px", overflow: "hidden"});
                                    }else{
                                        setSizeCard({height: "236px", overflow: "hidden"});
                                    }
                                }
                            }}>close</i>
                        </div>
                        <div className="share">
                            <Share
                                Facebook={Facebook}
                                Twitter={Twitter}
                                Wapp={Wapp}
                            />
                        </div>
                        
                        <ScoreTarjeta
                            scoreMatch={scoreMatch}
                            opponents={opponents}
                            csgoLogoDefault={csgoLogoDefault}
                        />
                        
                        <p className="text-align-center cursor-default font-size">
                            <span className="label-data-style margin-entre-label-contenido" style={{color: data.darkVibrant}}>Torneo:</span> 
                            {league.name +" "+ serie.full_name}
                        </p>                        
                        <p className="text-align-center label-fecha cursor-default font-size">
                            <span className="label-data-style margin-entre-label-contenido" style={{color: data.darkVibrant}}>Se jugó el: </span>
                            <span>{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs</span>      
                        </p>
                        
                    </div>
                </Fragment>
            :
                <div className="not-first-index-container">
                    <div className="info-not-first-index text-align-center">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.darkVibrant}}>Torneo:</span> 
                        <span className="text-align-start">{league.name +" "+ serie.full_name}</span>     
                    </div>

                    <div className="info-not-first-index text-align-center">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: data.darkVibrant}}>Se jugó el: </span>
                        <span>{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs</span>     
                    </div>
                </div>
            }
            
        </div>
    );
}
export default MatchPrevio;