import React, {useEffect, useState} from 'react';
import { usePalette } from 'react-palette'
import { getTournamentMatches } from './getTournamentMatches';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
/* import Moment from 'moment'; */
/* import {momentSpanishSetup} from '../../utility/MomentSpanishSetup'; */
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoDeTarjetasHoy from '../mapmatch/ListadoDeTarjetasHoy';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';

const MatchTorneoApp = ({tournamentId, image_url}) => {
    /* momentSpanishSetup(); */

    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [paletestate, guardarPaleteCharged] = useState(false);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const { data } = usePalette(`https://cors-anywhere.herokuapp.com/` + image_url);
    const {darkMuted} = data;

    useEffect(() => { 
        (async () => {
            if (!matchesHoy.length > 0) {
                const {objLiga, badFetch} = await getTournamentMatches(proxyUrl, tournamentId);
                if (objLiga) {
                    guardarLoaderProgress({width: '100%'});
                    guardarMatchesHoy(objLiga);
                    if(objLiga.length === 0){   
                        guardarNoMatches(true);
                    }
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            }
        })()
        if (darkMuted !== undefined) {
            guardarPaleteCharged(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[darkMuted]);

    const {width} = loaderprogress;

    if (crash !== true){
        if(width === '100%' && paletestate === true){
            if(noMatches !== true){
                //const live = matchesHoy.filter(match => match.status === "running");
                //const hoy = matchesHoy.filter(match => match.begin_at === "running");
                //const proximamente = matchesHoy.filter(match => match.status === "running");
                return(
                    <div className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                        <div className="z-depth-5 gradient-position cursor-pointer mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon style={{color: data.lightVibrant}} icon={faChevronCircleLeft}/></a>
                        </div>
                        <div className="home-box">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                        </div>
                        <ListadoDeTarjetasHoy
                            matchesHoy={matchesHoy}
                            data = {data}
                        />
                        <Footer/>
                    </div>
                );
            }else{
                return(
                    <div className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                        <div className="z-depth-5 gradient-position cursor-pointer mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon style={{color: data.lightVibrant}} icon={faChevronCircleLeft}/></a>
                        </div>
                        <div className="home-box">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                        </div>
                        <TarjetaInformativa
                            noMatches={noMatches}
                        />
                        <Footer/>
                    </div>
                );
            }
        }else{
            return(
                <div className="parametros-container menu-background">
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    /> 
                </div>
            );
        };
    }else{
        return(
            <div className="parametros-container menu-background">       
                <Warning/> 
                <Footer/>
            </div>
        );
    };   
    
}

/*<div className="nav-bar-container mb-15px animate__animated animate__fadeInDown animate__faster">
                            //<a onClick={ ()=>{  } } className="waves-effect waves-light btn nav-bar-button"  href={`/${}#`} >En Vivo</a>
                            //<a onClick={ ()=>{  } } className="waves-effect waves-light btn nav-bar-button" >Hoy</a>
                            //<a onClick={ ()=>{  } } className="waves-effect waves-light btn nav-bar-button" >Proximamente</a>
                        </div>*/
 
export default MatchTorneoApp;