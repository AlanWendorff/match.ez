import React, {useEffect, useState, useContext} from 'react';
import Header from '../header/Header';
import ListadoDeTarjetas from '../mapmatch/ListadoDeTarjetas';
import ListadoDePartidosPrevios from '../mapmatch/ListadoDePartidosPrevios';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import Estadisticas from '../tarjetas/stadisticard/Estadisticas';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import { HeaderLogoContext } from '../context/HeaderLogoContext';

import { getPastMatch } from './getPastMatch';
import { getNextMatches } from './getNextMatches';
import { getPlayerScore } from './getPlayerScore';

import '../../styles/base.css';
import 'react-notifications-component/dist/theme.css'
import csgoLogoDefault from '../../ImagenesVarias/csgoLogoDefault.png';
import ca_pattern from '../../pattern/ca_pattern.png';
import generic_team_pattern from '../../pattern/generic_team_pattern.png';
import isurus_pattern from '../../pattern/isurus_pattern.png';
import kaster_pattern from '../../pattern/kaster_pattern.png';
import malvinas_pattern from '../../pattern/malvinas_pattern.png';
import mibr_pattern from '../../pattern/mibr_pattern.png';
import river_pattern from '../../pattern/river_pattern.png';
import np_pattern from '../../pattern/np_pattern.png';
import sharks_pattern from '../../pattern/sharks_pattern.png';

const MatchesApp = ({teamId, image_url, name}) => { 
    let urlTeamId = "";
    let classContainer = "parametros-container mosaico noselect "
    let backgroundStyle;

    let winStrike = 0;
    let winRate   = 0;
    let matchWin  = 0;

    const { guardarLogo, data, paletestate } = useContext(HeaderLogoContext);
    const [loaderprogress, guardarLoaderProgress]  = useState({width: '0%'});
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [matches, guardarMatches]     = useState([]);
    const [scoreMatch, guardarScoreMatch] = useState([]);
    const [b64Logo, guardarB64Logo] = useState('');
    const [crash, guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  

    const proxyTeamLogo = 'https://proxy-kremowy.herokuapp.com/' + image_url;

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    if (image_url !== csgoLogoDefault) {
        toDataURL(proxyTeamLogo, function(dataUrl) {
            guardarB64Logo(dataUrl);
        })
    }
    

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
            if (image_url !== csgoLogoDefault) {
                backgroundStyle = {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="1280"><image width="400" height="400" xlink:href="${b64Logo}" /></svg>')`,
                    backgroundColor: `${data.darkVibrant}`,
                };
            }else{
                backgroundStyle = {
                    backgroundColor: `${data.darkVibrant}`,
                    backgroundImage: `url(${generic_team_pattern})`
                };
            }
            
            urlTeamId = teamId;
            break;
    }

    useEffect(() => {  
        //console.log("loop del effect");
        (async () => {
            if (prevMatch.length === 0) {
                const {objPastMatch, badFetch} = await getPastMatch(teamId);
                if (objPastMatch && objPastMatch.length !== 0) {
                    guardarLoaderProgress({width: '30%'});
                    guardarPrevMatch(objPastMatch);
                    if(scoreMatch.length === 0){
                        const {objPlayerScore, badFetch} = await getPlayerScore(objPastMatch);
                        //console.log("calling player score");
                        if (objPlayerScore) {
                            guardarLoaderProgress({width: '50%'});
                            guardarScoreMatch(objPlayerScore);
                        }
                        if (badFetch) {
                            guardarStateCrash(true);
                        }  
                    };
                }else{
                    guardarPrevMatch("no-match");
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
                if (image_url) {
                    guardarLogo(image_url);
                } 
            };
            
            if(!matches.length > 0){
                const {objNextMatches, badFetch} = await getNextMatches(urlTeamId);
                //console.log("calling next match");
                if (objNextMatches) {
                    guardarLoaderProgress({width: '100%'});
                    const matchesFiltered = objNextMatches.filter(status => status.status !== "canceled");
                    guardarMatches(matchesFiltered);
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
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className={classContainer} style={backgroundStyle}>
                        <Header/>   
                        {prevMatch !== "no-match"?
                            <ListadoDePartidosPrevios
                                prevMatch={prevMatch}
                                teamId={teamId}
                                scoreMatch={scoreMatch}
                            />
                        :
                            null
                        }                                                                                                                              
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
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className={classContainer} style={backgroundStyle}>
                        <Header/>                                                                                                                                 
                        {prevMatch !== "no-match"?
                            <ListadoDePartidosPrevios
                                prevMatch={prevMatch}
                                teamId={teamId}
                                scoreMatch={scoreMatch}
                            />
                        :
                            null
                        }  
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
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className={classContainer} style={{backgroundColor: 'black'}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    />
                </div>
            );  
        };
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className={classContainer} style={{backgroundColor: '#040c1c'}}>                                                                                                                                      
                <Warning/>       
                <Footer/>
            </div>
        );
    }; 
}
 
export default MatchesApp;