import React, {useContext, Fragment, useState} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import { Link } from 'react-router-dom';
import ScoreTarjeta from './matchStadistic/ScoreTarjeta';
import ProgressiveImage from 'react-progressive-image';
import csgoLogoDefaultBlack from '../../../ImagenesVarias/csgoLogoDefaultBlack.png';
import Moment from 'moment';
import Share from '../../share/Share';
import {setTeamLogo} from '../../../utility/SetTeamLogo';
import {setMatchResult} from '../../../utility/SetMatchResult';
import {setGameMode} from '../../../utility/SetGameMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faSortDown, faSortUp, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { usePalette } from 'react-palette';
import { 
    LOOKPROFILE 
} from '../../../titlestag/titlestag';
import './tarjetaMatchesCompletos.css';
import './matchprevio.css';

const MatchPrevio = ({match, teamId, scoreMatch, firstIndexDate}) => {
    //momentSpanishSetup();
    let proxyLogo;
    let fase = "";
    const [content, setContent] = useState(false);
    const {number_of_games, league, serie, tournament, begin_at, id, opponents, results, name} = match;
    const { data } = useContext(HeaderLogoContext);
    const {bTeamLogo, bTeamName, aTeamLogo, aTeamName, bTeamSlug, aTeamSlug, csgoLogoDefault} = setTeamLogo(opponents, teamId); 
    const {A_point, B_point} = setMatchResult(results, teamId);
    const {modalidad} = setGameMode(number_of_games);

    if (league.image_url !== null && league.image_url !== csgoLogoDefault) proxyLogo = 'https://proxy-kremowy.herokuapp.com/' + league.image_url;
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
    const Facebook = 
    `${bTeamName}: ${B_point} 
    ${aTeamName}: ${A_point}  
    ${league.name +" "+ serie.full_name}
    `;
    const Twitter = `${bTeamName}: ${B_point} VS ${aTeamName}: ${A_point} | ${league.name+" "+serie.full_name}`;
    const Wapp = `${bTeamName}: ${B_point} VS ${aTeamName}: ${A_point} |  ${league.name +" "+ serie.full_name} -> ${window.location.href}`;
    
    //eslint-disable-next-line
    return(
        <div className="noselect card posicion-tarjeta size-prev-game font-gilroy transition-effect animate__animated animate__fadeInDown animate__faster"> 
            
            <div className="card-image" style={{borderTop: `5px solid ${leagueColors.lightVibrant}`}}>
                <div className="card-image prev-game-content cursor-default">
                    <div className="prev-game-header-container">
                        <p className="prev-game-header" style={{color: data.darkMuted}}>{fase}</p>
                    </div> 

                    <div className="prev-game-desktop">
                        <div className="team-column">
                            <Link to={!teamId? `/${aTeamSlug}` : `/${bTeamSlug}`}>
                                <div className={A_point < B_point? "match-loser-prevgame" :"match-winner-prevgame"}>                            
                                    <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={!teamId? LOOKPROFILE + aTeamName : null} alt="a team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                    </ProgressiveImage>
                                </div> 
                            </Link>

                            <p className="name-of-teams">{aTeamName}</p> 
                        </div>

                        <div>
                            <div className="game-win">
                                <p className={A_point < B_point? "match-loser point-A" :"match-winner point-A"}>{A_point}</p>
                                <p>-</p>
                                <p className={A_point < B_point? "match-winner point-B" : "match-loser point-B"}>{B_point}</p>                           
                            </div> 

                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div>

                        <div className="team-column">
                            <Link to={`/${bTeamSlug}`}>
                                <div className={A_point < B_point? "match-winner-prevgame" : "match-loser-prevgame"}>
                                    <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={LOOKPROFILE + bTeamName } alt="b team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                    </ProgressiveImage>
                                </div> 
                            </Link>
                            <p className="name-of-teams">{bTeamName}</p> 
                        </div>
                    </div>


                    <div className="prev-game-mobile">
                        <div className="row-team-name-gamewin">
                            <div className={A_point > B_point? "match-loser" :"match-winner"}>                            
                                <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img title={LOOKPROFILE + bTeamName} alt="a team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                </ProgressiveImage>
                            </div> 
                            <p className={A_point > B_point? "match-loser" :"match-winner"}>{bTeamName}</p> 
                            <p className={A_point > B_point? "match-loser point-A" :"match-winner point-A"}>{B_point}</p>
                        </div>

                        <div className="row-team-name-gamewin">
                            <div className={A_point > B_point? "match-winner" : "match-loser"}>                            
                                <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img  alt="b team" className="max-size-logo-prev-game animate__animated animate__fadeIn animate__fast" src={src}/>}
                                </ProgressiveImage> 
                            </div> 
                            <p className={A_point > B_point? "match-winner" :"match-loser"}>{aTeamName}</p>
                            <p className={A_point > B_point? "match-winner point-B" : "match-loser point-B"}>{A_point}</p>
                        </div>

                        <div className="text-in-card">
                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div> 
                    </div>
                </div>            
            </div>
            <div onClick={()=>{content? setContent(false) : setContent(true)}} className="sort-content"><FontAwesomeIcon icon={!content? faSortDown : faSortUp}/></div>
            {content&&
                <Fragment>
                    {!teamId&&
                        <Fragment>
                            <div className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faTrophy}/></span> 
                                <span className="align-end">{league.name +" "+ serie.full_name}</span>     
                            </div>

                            <div className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faCalendarDay}/> </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs</span>     
                            </div>
                            <div className="prevgame-share">
                                <Share
                                    Facebook={Facebook}
                                    Twitter={Twitter}
                                    Wapp={Wapp}
                                />
                            </div>
                        </Fragment>
                    }

                    {teamId?
                        id === firstIndexDate?   
                        <Fragment>
                            <ScoreTarjeta
                                scoreMatch={scoreMatch}
                                opponents={opponents}
                                csgoLogoDefaultBlack={csgoLogoDefaultBlack}
                            />
                            <p className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faTrophy}/></span> 
                                <span className="align-end">{league.name +" "+ serie.full_name}</span>
                            </p>                        
                            <p className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faCalendarDay}/> </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs</span>      
                            </p>
                            <div className="prevgame-share">
                                <Share
                                    Facebook={Facebook}
                                    Twitter={Twitter}
                                    Wapp={Wapp}
                                />
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faTrophy}/></span> 
                                <span className="align-end">{league.name +" "+ serie.full_name}</span>     
                            </div>

                            <div className="info-not-first-index">
                                <span className="label-data-style" style={{color: data.darkVibrant}}><FontAwesomeIcon icon={faCalendarDay}/> </span>
                                <span>{Moment(begin_at).format('Do')} {Moment(begin_at).format('MMMM - H:mm')} hs</span>     
                            </div>
                            <div className="prevgame-share">
                                <Share
                                    Facebook={Facebook}
                                    Twitter={Twitter}
                                    Wapp={Wapp}
                                />
                            </div>
                        </Fragment>
                    :
                    null
                    }
                </Fragment>
            }
        </div>
    );
}
export default MatchPrevio;