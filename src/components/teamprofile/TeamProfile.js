import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router';
import { HeaderLogoContext } from '../Context/HeaderLogoContext';
import { getNextMatches } from './getNextMatches';
import { getPlayerScore } from './getPlayerScore';
import { getPastMatch } from './getPastMatch';
import { HOME } from '../../routes/routes';
import HistoricMatchMapping from '../HistoricMatchCard/HistoricMatchMapping';
import OneTeamMapping from '../OneTeamCard/OneTeamMapping';
import StadisticCard from '../StadisticCard/StadisticCard';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoadScreen from '../Loader/LoadScreen';
import InfoCard from '../InfoCard/InfoCard';
import Warning from '../Warning/Warning';
import Logo from '../NavigationBar/Logo';
import generic_team_pattern from '../../Images/generic_team_pattern.png';
import csgoLogoDefault from '../../Images/csgoLogoDefault.png';
import '../../styles/base.css';

const TeamProfile = () => { 
    const {teamid} = useParams();
    const history = useHistory();
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
    const [show, setShow] = useState("vs");
    const [crash, guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [image_url, setImageTeam] = useState('');

    useEffect(() => {  
        guardarLoaderProgress({width: '0%'})
        guardarNoMatches(false);
        guardarStateCrash(false);

        (async () => {
            const {objPastMatch, badFetch} = await getPastMatch(teamid);
            const {data, imageTeam} = objPastMatch;
            if (!data) history.push(HOME);
            if (data && data.length !== 0) {
                guardarPrevMatch(data);
                if (imageTeam === null) {
                    setImageTeam(csgoLogoDefault);
                }else{
                    setImageTeam('https://proxy-kremowy.herokuapp.com/' + imageTeam);
                    guardarLogo('https://proxy-kremowy.herokuapp.com/' + imageTeam);
                }
                guardarLoaderProgress({width: '30%'});
                const {objPlayerScore, badFetch} = await getPlayerScore(data);
                if (objPlayerScore) {
                    guardarScoreMatch(objPlayerScore);
                    guardarLoaderProgress({width: '50%'});
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }  
            }else{
                guardarPrevMatch("no-match");
            }
            if (badFetch) {
                guardarStateCrash(true);
            }
            if (winStrike !== -3) {
                const {objNextMatches, badFetch} = await getNextMatches(teamid);
                if (objNextMatches) {
                    const matchesFiltered = objNextMatches.filter(status => status.status !== "canceled");
                    guardarMatches(matchesFiltered);
                    if(objNextMatches.length === 0){   
                        guardarNoMatches(true);
                    }
                    guardarLoaderProgress({width: '100%'});
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[teamid]);

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
        toDataURL(image_url, function(dataUrl) {
            guardarB64Logo(dataUrl);
        })
    }
    
    if (image_url !== csgoLogoDefault) {
        backgroundStyle = {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="1280"><image width="400" height="400" xlink:href="${b64Logo}" /></svg>')`,
            backgroundColor: `${data.darkMuted}`,
            
        };
    }else{
        backgroundStyle = {
            backgroundColor: `${data.darkVibrant}`,
            backgroundImage: `url(${generic_team_pattern})`
        };
    }

    if(prevMatch.length !== 0){
        for(let i = 0; i < prevMatch.length; i++) {
            if(prevMatch[i].winner_id === parseInt(teamid)){
                matchWin = matchWin + 1;
            }
        }
        let avg = matchWin * 100 / prevMatch.length;
        winRate = parseFloat(avg).toFixed(2)+"%";

        for(let c = prevMatch.length-1; c >= 0; c--) {
            if(prevMatch[c].winner_id === parseInt(teamid)){
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
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container mosaico noselect" style={backgroundStyle}>
                    <MobileHeader
                        color={data}
                        img={image_url}
                        setShow={setShow}
                    />  
                    <StadisticCard
                        winRate={winRate}
                        winStrike={winStrike}
                    /> 
 
                    {show === "vs" && !matches.length > 0 &&
                        <InfoCard
                            noMatches={noMatches}
                        />
                    }
                    {show === "vs" && matches.length > 0 &&
                        <OneTeamMapping
                            matches={matches}
                            teamid={teamid}
                        />
                    }

                    {show === "history" && prevMatch !== "no-match" &&
                        <HistoricMatchMapping
                            prevMatch={prevMatch}
                            teamid={teamid}
                            scoreMatch={scoreMatch}
                        />
                    }                                                                                                                           
                    <Logo
                        color={data}
                        img={image_url}
                    />
                </div>
            );      
        }else{                                                       // RETURN APP LOADING
            return (
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container mosaico noselect" style={{backgroundColor: 'black'}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    />
                </div>
            );  
        };
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container mosaico noselect" style={{backgroundColor: '#040c1c'}}>                                                                                                                                      
                <Warning/>       
            </div>
        );
    }; 
}
 
export default TeamProfile;