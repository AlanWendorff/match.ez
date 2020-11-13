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
import { HeaderLogoContext } from '../context/HeaderLogoContext'
import '../../styles/base.css';

const MatchesApp = ({teamId}) => {

    const { data } = useContext(HeaderLogoContext);
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;  
    let winStrike = 0;
    let winRate = 0;
    let matchWin   = 0;
    let urlTeamId = "";
    let classContainer = "parametros-container mosaico "
    const backgroundStyle = {
        backgroundColor: `${data.darkVibrant}`
    };

    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [matches, guardarMatches]     = useState([]);
    const [crash, guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [scoreMatch, guardarScoreMatch] = useState([]);

    switch (teamId) {
        case 126709:  //9z
            classContainer = classContainer + "kaster-mosaico";
            urlTeamId = teamId;
            break;

        case 125863:  //Isurus
            classContainer = classContainer + "Isurus-mosaico";
            urlTeamId = teamId;
            break;

        case 127524:  //Cream
            classContainer = classContainer + "Cream-mosaico";
            urlTeamId = teamId;
            break;

        case 127882:  //malvinas
            classContainer = classContainer + "Malvinas-mosaico";
            urlTeamId = teamId;
            break;

        case 3260:  //sharks
            classContainer = classContainer + "Sharks-mosaico";
            urlTeamId = teamId;
            break;    
    
        case 125779:  //FuriousGaming
            classContainer = classContainer + "Furious-mosaico";
            urlTeamId = teamId;
            break;  

        case 127246:  //CoscuArmy
            classContainer = classContainer + "ca-mosaico";
            urlTeamId = teamId;
            break; 

        case 127883:  //New Pampas
            classContainer = classContainer + "NewPampas-mosaico";
            urlTeamId = teamId;
            break; 

        case 3250:  //mibr
            classContainer = classContainer + "mibr-mosaico";
            urlTeamId = teamId;
            break;
            
        default:
            classContainer = classContainer + "menu-background";
            urlTeamId = teamId;
            break;
    }

    useEffect(() => {  
        const consultarAPI = async () => {                                                                                       //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
            const urlUpcoming = `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[finished]=false&filter[unscheduled]=false&filter[opponent_id]=${urlTeamId}&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
            const urlPast     = `https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${urlTeamId}&filter[finished]=true&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
            try {
                const respuestaUpcoming = await fetch(proxyUrl + urlUpcoming);
                const respuestaPast = await fetch(proxyUrl + urlPast);      
                if (respuestaUpcoming.status !== 200 || respuestaPast.status !== 200){
                    console.log("error");
                    guardarStateCrash(true);
                };
                const objetoMatchesUpcoming = await respuestaUpcoming.json();
                const objetoPrevMatch = await respuestaPast.json();
                guardarLoaderProgress({width: '90%'});
                guardarMatches(objetoMatchesUpcoming); 
                guardarPrevMatch(objetoPrevMatch);
            } catch (error) {
                guardarStateCrash(true);      
            };      
        };

        if(!matches.length > 0){   
            guardarLoaderProgress({width: '40%'});                    // validates the content of the request to stop the request 
            consultarAPI(); 
            if(matches.length === 0){   
                guardarNoMatches(true);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const consultarScoreMatch = async () => { 
        let prevmatchID = prevMatch[0].id                                     //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
        const urlScoreMatch = `https://api.pandascore.co/csgo/matches/${prevmatchID}/players/stats?token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
        try { 
            const respuestaScoreMatch = await fetch(proxyUrl + urlScoreMatch);      
            if (respuestaScoreMatch.status !== 200){
                guardarStateCrash(true);
            };
            const objetoScoreMatch = await respuestaScoreMatch.json();
            guardarScoreMatch(objetoScoreMatch); 
            guardarLoaderProgress({width: '100%'});
        } catch (error) {
            guardarStateCrash(true);      
        };      
    };

    if(prevMatch.length !== 0){
        if (scoreMatch.length === 0){
            consultarScoreMatch();
        };

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
        if(width === '100%' && prevMatch.length > 0){
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