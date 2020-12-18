import React, {useEffect, useState, useContext} from 'react';
import Header from '../header/Header';
import ListadoDeTarjetas from '../mapmatch/ListadoDeTarjetas';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import Estadisticas from '../tarjetas/stadisticard/Estadisticas';
import MatchPrevio from '../tarjetas/twoteamscard/MatchPrevio';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import ScoreTarjeta from '../tarjetas/scorecard/ScoreTarjeta';
import { HeaderLogoContext } from '../context/HeaderLogoContext';
import {setTeamLogo} from '../../utility/SetTeamLogo';

import { getPastMatch } from './getPastMatch';
import { getNextMatches } from './getNextMatches';
import { getPlayerScore } from './getPlayerScore';

import '../../styles/base.css';

import ca_pattern from '../../pattern/ca_pattern.png';
import fg_pattern from '../../pattern/fg_pattern.png';
import generic_team_pattern from '../../pattern/generic_team_pattern.png';
import isurus_pattern from '../../pattern/isurus_pattern.png';
import kaster_pattern from '../../pattern/kaster_pattern.png';
import malvinas_pattern from '../../pattern/malvinas_pattern.png';
import mibr_pattern from '../../pattern/mibr_pattern.png';
import river_pattern from '../../pattern/river_pattern.png';
import np_pattern from '../../pattern/np_pattern.png';
import sharks_pattern from '../../pattern/sharks_pattern.png';


const MatchesApp = ({teamId}) => {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;  
    
    let urlTeamId = "";
    let classContainer = "parametros-container mosaico "
    let backgroundStyle;

    let winStrike = 0;
    let winRate   = 0;
    let matchWin  = 0;

    const { guardarLogo, data, paletestate } = useContext(HeaderLogoContext);
    const [loaderprogress, guardarLoaderProgress]  = useState({width: '0%'});
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [matches, guardarMatches]     = useState([]);
    const [scoreMatch, guardarScoreMatch] = useState([]);
    const [crash, guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  

    switch (teamId) {
        case 126709:  //9z
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${kaster_pattern})`
            };
            urlTeamId = teamId;
            break;

        case 125863:  //Isurus
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${isurus_pattern})`
            };
            urlTeamId = teamId;
            break;

        case 127882:  //malvinas
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${malvinas_pattern})`
            };
            urlTeamId = teamId;
            break;

        case 3260:  //sharks
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${sharks_pattern})`
            };
            urlTeamId = teamId;
            break;    
    
        case 125779:  //FuriousGaming
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${fg_pattern})`
            };
            urlTeamId = teamId;
            break;  

        case 127246:  //CoscuArmy
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${ca_pattern})`
            };
            urlTeamId = teamId;
            break; 

        case 127883:  //New Pampas
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${np_pattern})`
            };
            urlTeamId = teamId;
            break; 

        case 3250:  //mibr
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${mibr_pattern})`
            };
            urlTeamId = teamId;
            break;

        case 127693:  //River
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${river_pattern})`
                
            };
            urlTeamId = teamId;
            break; 
            
        default:
            classContainer = classContainer + "menu-background";
            backgroundStyle = {
                backgroundColor: `${data.darkVibrant}`,
                backgroundImage: `url(${generic_team_pattern})`
            };
            urlTeamId = teamId;
            break;
    }

    useEffect(() => {  
        //console.log("loop del effect");
        (async () => {
            if (prevMatch.length === 0) {
                const {objPastMatch, badFetch} = await getPastMatch(proxyUrl, teamId);
                //console.log("calling prev match");
                if (objPastMatch) {
                    guardarLoaderProgress({width: '30%'});
                    guardarPrevMatch(objPastMatch);
                    if(scoreMatch.length === 0){
                        const {objPlayerScore, badFetch} = await getPlayerScore(proxyUrl, objPastMatch);
                        //console.log("calling player score");
                        if (objPlayerScore) {
                            guardarLoaderProgress({width: '50%'});
                            guardarScoreMatch(objPlayerScore);
                            const ultimoMatch = objPastMatch[0];
                            const {opponents} = ultimoMatch;
                            const {ownLogo} = setTeamLogo(opponents, teamId);
                            if (ownLogo !== '') {
                                guardarLogo(ownLogo);
                            } 
                        }
                        if (badFetch) {
                            guardarStateCrash(true);
                        }  
                    };
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            };
            
            if(!matches.length > 0){
                const {objNextMatches, badFetch} = await getNextMatches(proxyUrl, urlTeamId);
                //console.log("calling next match");
                if (objNextMatches) {
                    guardarLoaderProgress({width: '100%'});
                    guardarMatches(objNextMatches);
                    if(objNextMatches.length === 0){   
                        guardarNoMatches(true);
                    }
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            };
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(prevMatch.length !== 0){
        for(let i = 0; i < prevMatch.length; i++) {
            if(prevMatch[i].winner_id === teamId){
                matchWin = matchWin + 1;
            }
        }
        let avg = matchWin * 100 / prevMatch.length;
        winRate = parseFloat(avg).toFixed(2)+"%";

        for(let c = prevMatch.length-1; c >= 0; c--) {
            if(prevMatch[c].winner_id === teamId){
                winStrike = winStrike + 1;
            }
            else{
                winStrike = 0;
            }
        }    
    }

    const {width} = loaderprogress;
    if (!crash){
        if(width === '100%' && prevMatch.length > 0 && paletestate === true){
            if (!matches.length > 0) {
                return(
                    <div className={classContainer} style={backgroundStyle}>
                        <Header/>                                                                                                                                 
                        <MatchPrevio
                            prevMatch={prevMatch}
                            teamId={teamId}
                            scoreMatch={scoreMatch}
                        />
                        <ScoreTarjeta
                            scoreMatch={scoreMatch}
                            prevMatch={prevMatch}
                        />
                        <hr className="position-hr" noshade="noshade" style={{filter: `drop-shadow(2px 2px 20px ${data.lightVibrant})`}}/>
                        <Estadisticas
                            winRate={winRate}
                            winStrike={winStrike}
                        /> 
                        <TarjetaInformativa
                            noMatches={noMatches}
                        />
                        <Footer/>
                    </div>
                ); 
            }else{
                return(
                    <div className={classContainer} style={backgroundStyle}>
                        <Header/>                                                                                                                                 
                        <MatchPrevio
                            prevMatch={prevMatch}
                            teamId={teamId}
                            scoreMatch={scoreMatch}
                        />
                        <ScoreTarjeta
                            scoreMatch={scoreMatch}
                            prevMatch={prevMatch}
                        />
                        <hr className="position-hr" noshade="noshade" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}}/>
                        <Estadisticas
                            winRate={winRate}
                            winStrike={winStrike}
                        /> 
                        <ListadoDeTarjetas
                            matches={matches}
                            teamId={teamId}
                        />
                        <Footer/>
                    </div>
                );   
            };
        }else{                                                       // RETURN APP LOADING
            return (
                <div className={classContainer} style={backgroundStyle}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    />
                </div>
            );  
        };
    }else{
        return(
            <div className={classContainer}>                                                                                                                                      
                <Warning/>       
                <Footer/>
            </div>
        );
    }; 
}
 
export default MatchesApp;