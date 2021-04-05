import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router';
import { HeaderLogoContext } from '../Context/HeaderLogoContext';
import { getLeagueGames } from './getLeagueGames';
import { HOME } from '../../routes/routes';
import HistoricMatchMapping from '../HistoricMatchCard/HistoricMatchMapping';
import CompetitionMapping from '../CompetitionCard/CompetitionMapping';
import MobileHeader from '../MobileHeader/MobileHeader';
import Leaderboard from '../Leaderboard/Leaderboard';
import LoadScreen from '../Loader/LoadScreen';
import InfoCard from '../InfoCard/InfoCard';
import Logo from '../NavigationBar/Logo';
import Warning from '../Warning/Warning';
import generic_team_pattern from '../../Images/generic_team_pattern.png';
import csgoLogoDefault from '../../Images/csgoLogoDefault.png';

const LeagueGames = () => {
    const {tournamentId} = useParams();
    const history = useHistory();
    let backgroundStyle;

    const { guardarLogo, data, paletestate } = useContext(HeaderLogoContext);
    
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [leaderboard, guardarLeaderboard] = useState([]);
    const [b64Logo, guardarB64Logo] = useState('');
    const [image_url, setImageLeague] = useState('');
    const [show, setShow] = useState("vs");
    const [buttonstatus, setButtonStatus] = useState(
        {   
            preview: false,
            vs: true,
            history: false,
            ladder: false
        }
    );
    const setHistory = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: true,
            ladder: false,
            preview: false,
        })
        setShow("history");
    }

    const setLadder = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: false,
            ladder: true,
            preview: false,
        })
        setShow("ladder");
    }

    const setVs = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: true,
            history: false,
            ladder: false,
            preview: false,
        })
        setShow("vs");
    }
    
    useEffect(() => { 
        (async () => {
            if (!matchesHoy.length > 0) {
                const {leagueGames, badFetch} = await getLeagueGames(tournamentId);
                const {data, ladder, lastGames, imageLeague} = leagueGames;
                if (leagueGames) {
                    guardarMatchesHoy(data);
                    guardarLeaderboard(ladder);
                    if (imageLeague === null) {
                        setImageLeague(csgoLogoDefault);
                    }else{
                        setImageLeague('https://proxy-kremowy.herokuapp.com/' + imageLeague);
                        guardarLogo('https://proxy-kremowy.herokuapp.com/' + imageLeague);
                    }
                    if (lastGames.length < 1) {
                        guardarPrevMatch("no-match");
                    }else{
                        guardarPrevMatch(lastGames);
                    }
                    guardarLoaderProgress({width: '100%'});
                }
                if (!data) {
                    history.push(HOME)
                }else{
                    if (badFetch) {
                        guardarStateCrash(true);
                    }
                    if(!data.length > 0){   
                        guardarNoMatches(true);
                    }
                } 
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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

    const {width} = loaderprogress;
    
    if (crash !== true){
        if(width === '100%' && paletestate === true){
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background" style={backgroundStyle}>
                    <MobileHeader
                        color={data}
                        img={image_url}
                        buttonstatus={buttonstatus}
                        setVs={setVs}
                        setHistory={setHistory}
                        setLadder={setLadder}
                        setPreview
                        isTournament
                    />
                    {show === "ladder"&&
                        <Leaderboard 
                            leaderboard={leaderboard}
                        />
                    }
                    {show === "vs" && noMatches !== true &&
                        <CompetitionMapping matchesHoy={matchesHoy} data={data}/> 
                    }
                    {show === "vs"&& noMatches === true&&
                        <InfoCard/>
                    }
                    {show === "history" && prevMatch !== "no-match" &&
                        <HistoricMatchMapping
                            prevMatch={prevMatch}
                            setShow={setShow}
                        />
                    }  
                    <Logo
                        color={data}
                        img={image_url}
                    />
                </div>
            );
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background" style={{backgroundColor: 'black'}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    /> 
                </div>
            );
        };
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background">       
                <Warning/> 
            </div>
        );
    };   
    
}
 
export default LeagueGames;