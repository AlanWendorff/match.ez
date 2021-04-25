import React, {useContext, Fragment, useState } from 'react';
import { faCalendarDay, faSortDown, faSortUp, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { HeaderLogoContext } from '../Context/HeaderLogoContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOOKPROFILE } from '../../titlestag/titlestag';
import { setGameMode } from '../../utility/SetGameMode';
import { getPlayerScore } from './getPlayerScore';
import { usePalette } from 'react-palette';
import { TEAM } from '../../routes/routes';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import PlayerScore from '../PlayerScore/PlayerScore';
import Share from '../Share/Share';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import csgoLogoDefault from '../../Images/csgoLogoDefault.png';
import '../CompetitionCard/tarjetaMatchesCompletos.css';
import './matchprevio.css';

const HistoricMatchCard = ({match, teamId, firstIndex, setPlayerScore, playerscore}) => {

    let proxyLogo;
    let fase = "";
    let colorTeamA;
    let colorTeamB;
    const [badfetch, setBadFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(false);
    const {number_of_games, league, serie, tournament, begin_at, id, opponents, results, name} = match;
    const { data } = useContext(HeaderLogoContext);
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
    `${opponents[0].opponent.name}: ${results[0].score} 
    ${opponents[1].opponent.name}: ${results[1].score}  
    ${league.name +" "+ serie.full_name}
    `;
    const Twitter = `${opponents[0].opponent.name}: ${results[0].score} VS ${opponents[1].opponent.name}: ${results[1].score} | ${league.name+" "+serie.full_name} -> ${window.location.href}`;
    const Wapp = `${opponents[0].opponent.name}: ${results[0].score} VS ${opponents[1].opponent.name}: ${results[1].score} |  ${league.name +" "+ serie.full_name} -> ${window.location.href}`;

    const playerScore = async () => {
        const {teams} = playerscore; 
        if (teams === undefined) {
            setLoading(true);
            const {objPlayerScore, badFetch} = await getPlayerScore(id);
            if (objPlayerScore) {
                setLoading(false);
                setPlayerScore(objPlayerScore);
            }
            if (badFetch) {
                setBadFetch(true);
            } 
        }
    }

    colorTeamA = usePalette('https://proxy-kremowy.herokuapp.com/' + opponents[0].opponent.image_url).data;
    colorTeamB = usePalette('https://proxy-kremowy.herokuapp.com/' + opponents[1].opponent.image_url).data;
 
    if (colorTeamA.darkVibrant === undefined) {
        colorTeamA = {
            darkVibrant: "#2d6da3"
        }
    }
    if (colorTeamB.darkVibrant === undefined) {
        colorTeamB = {
            darkVibrant: "#2d6da3"
        }
    }
    //eslint-disable-next-line
    return(
        <div className={`noselect card posicion-tarjeta size-prev-game font-gilroy transition-effect animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}> 
            <div className="card-image" style={teamId&& {borderTop: `5px solid ${leagueColors.lightVibrant}`}}>
                <div className="card-image prev-game-content cursor-default">
                    <div className="prev-game-header-container">
                        <p className="prev-game-header" style={{color: data.darkMuted}}>{fase}</p>
                    </div> 

                    <div className="prev-game-desktop">
                        <div className="team-column">
                            <Link to={TEAM.replace(':teamid', opponents[0].opponent.id)}>
                                <div className={results[0].score < results[1].score? "match-loser-prevgame" :"match-winner-prevgame"}>                            
                                    <ProgressiveImage src={opponents[0].opponent.image_url === null? csgoLogoDefaultBlack : opponents[0].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={LOOKPROFILE + opponents[0].opponent.name} alt="a team" className="max-size-logo-prev-game" src={src}/>}
                                    </ProgressiveImage>
                                </div> 
                            </Link>

                            <p className="name-of-teams">{opponents[0].opponent.name}</p> 
                        </div>

                        <div>
                            <div className="game-win font-gilroy-bold">
                                <p className={results[0].score < results[1].score? "match-loser point-A" :"match-winner point-A"}>{results[0].score}</p>
                                <p>-</p>
                                <p className={results[0].score < results[1].score? "match-winner point-B" : "match-loser point-B"}>{results[1].score}</p>                           
                            </div> 

                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div>

                        <div className="team-column">
                            <Link to={TEAM.replace(':teamid', opponents[1].opponent.id)}>
                                <div className={results[0].score < results[1].score? "match-winner-prevgame" : "match-loser-prevgame"}>
                                    <ProgressiveImage src={opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                        {src => <img title={LOOKPROFILE + opponents[1].opponent.name} alt="b team" className="max-size-logo-prev-game" src={src}/>}
                                    </ProgressiveImage>
                                </div> 
                            </Link>
                            <p className="name-of-teams">{opponents[1].opponent.name}</p> 
                        </div>
                    </div>


                    <div className="prev-game-mobile">
                        <div className="row-team-name-gamewin">
                            <div className={results[0].score < results[1].score? "match-loser" : "match-winner"} >                            
                                <ProgressiveImage src={opponents[0].opponent.image_url === null? csgoLogoDefaultBlack : opponents[0].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img alt="a team" className="max-size-logo-prev-game" src={src}/>}
                                </ProgressiveImage>
                            </div> 
                            <p className={results[0].score < results[1].score? "match-loser" :"match-winner"} style={{backgroundColor: results[0].score > results[1].score&& colorTeamA.darkVibrant, color: results[0].score > results[1].score&& 'white'}} >{opponents[0].opponent.name}</p> 
                            <p className={results[0].score < results[1].score? "match-loser point-A" :"match-winner point-A"}>{results[0].score}</p>
                        </div>

                        <div className="row-team-name-gamewin">
                            <div className={results[0].score < results[1].score? "match-winner" : "match-loser"} >                            
                                <ProgressiveImage src={opponents[1].opponent.image_url === null? csgoLogoDefaultBlack : opponents[1].opponent.image_url} placeholder={csgoLogoDefaultBlack}>
                                    {src => <img alt="b team" className="max-size-logo-prev-game" src={src}/>}
                                </ProgressiveImage> 
                            </div> 
                            <p className={results[0].score < results[1].score? "match-winner" :"match-loser"} style={{backgroundColor: results[0].score < results[1].score&& colorTeamB.darkVibrant, color: results[0].score < results[1].score&& 'white'}}>{opponents[1].opponent.name}</p>
                            <p className={results[0].score < results[1].score? "match-winner point-B" : "match-loser point-B"}>{results[1].score}</p>
                        </div>

                        <div className="text-in-card">
                            <p className="bestof-prev-game" style={{color: data.darkMuted}}>{modalidad}</p>
                        </div> 
                    </div>
                </div>            
            </div>
            <div onClick={()=>{
                content? 
                    setContent(false) 
                : 
                    setContent(true); 
                if (teamId) {
                    id === firstIndex&& playerScore()
                }     
            }} className="sort-content"><FontAwesomeIcon icon={!content? faSortDown : faSortUp}/></div>
            
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
                        id === firstIndex?   
                        <Fragment>
                            <PlayerScore
                                playerscore={playerscore}
                                opponents={opponents}
                                csgoLogoDefaultBlack={csgoLogoDefaultBlack}
                                loading={loading}
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
export default HistoricMatchCard;