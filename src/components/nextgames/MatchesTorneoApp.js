import React, {useEffect, useState} from 'react';
import { getTournamentMatches } from './getTournamentMatches';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Leaderboard from './Leaderboard/Leaderboard';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoDeTarjetasHoy from '../mapmatch/ListadoDeTarjetasHoy';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import { usePalette } from 'react-palette'

const MatchTorneoApp = ({tournamentId, image_url}) => {
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [paletestate, guardarPaleteCharged] = useState(false);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const [leaderboard, guardarLeaderboard] = useState([]);
    const { data } = usePalette('https://proxy-kremowy.herokuapp.com/' + image_url)
    const {darkMuted} = data;
    
    useEffect(() => { 
        (async () => {
            if (!matchesHoy.length > 0) {
                const {matchesTournament, badFetch} = await getTournamentMatches(tournamentId);
                const {data, ladder} = matchesTournament;
                if (matchesTournament) {
                    guardarLoaderProgress({width: '100%'});
                    guardarMatchesHoy(data);
                    guardarLeaderboard(ladder);
                    if(data.length === 0){   
                        guardarNoMatches(true);
                    }
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const {width} = loaderprogress;

    if (crash !== true){
        if(width === '100%' && paletestate === true){
            if(noMatches !== true){
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                        <div className="z-depth-5 gradient-position mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon style={{color: data.lightVibrant}} icon={faChevronCircleLeft}/></a>
                        </div>
                        <div className="home-box">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                        </div>
                        {leaderboard?
                            <Leaderboard 
                            leaderboard={leaderboard}
                            />
                            :
                            null
                        }
                        
                        <ListadoDeTarjetasHoy
                            matchesHoy={matchesHoy}
                            data = {data}
                        />
                        <Footer/>
                    </div>
                );
            }else{
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                        <div className="z-depth-5 gradient-position mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon style={{color: data.lightVibrant}} icon={faChevronCircleLeft}/></a>
                        </div>
                        <div className="home-box">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                        </div>

                        {leaderboard?
                            <Leaderboard 
                            leaderboard={leaderboard}
                            />
                            :
                            null
                        }
                        
                        <TarjetaInformativa
                            noMatches={noMatches}
                        />
                        <Footer/>
                    </div>
                );
            }
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: '#040c1c'}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                        guardarPaleteCharged={guardarPaleteCharged}
                        darkMuted={darkMuted}
                    /> 
                </div>
            );
        };
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background">       
                <Warning/> 
                <Footer/>
            </div>
        );
    };   
    
}
 
export default MatchTorneoApp;