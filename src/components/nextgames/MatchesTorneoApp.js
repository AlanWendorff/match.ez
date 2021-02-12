import React, {useEffect, useState} from 'react';
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
import { usePalette } from 'react-palette'
/* import axios from 'axios'; */

const MatchTorneoApp = ({tournamentId, image_url}) => {
    /* momentSpanishSetup(); */
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [paletestate, guardarPaleteCharged] = useState(false);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const { data } = usePalette('https://proxy-kremowy.herokuapp.com/' + image_url)
    /* const [colors, guardarColors] = useState([]);

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
    
    const getColor = async () => {  
        const image = "https://cdn.pandascore.co/images/league/image/4243/798px-ESEA_banner.png";
        //https://arg-matchez-backend.herokuapp.com          
        const url = 'http://localhost:5000/api/getcolor';
        const configGet = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const configPost = {
            method: 'post',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            },
            data: {"image": `${image}`}
        };

        try {
            axios(configPost).then(()=> {
                axios(configGet).then((arrayColors)=> {
                    //guardarColors(arrayColors);
                    console.log(arrayColors.data);
                    
                      
                    rgbToHex(102, 51, 153);
                });
            });
        } catch (error) {
            console.log(error);  
        }
    };

    const data = {
        darkMuted: "#2a324b",
        darkVibrant: "#0e7a4b",
        lightMuted: "#9cceb7",
        lightVibrant: "#a4d4bc",
        muted: "#64aa8a",
        vibrant: "#b4d43c",
    } */
    const {darkMuted} = data;

    useEffect(() => { 
        /* getColor(); */
        (async () => {
            if (!matchesHoy.length > 0) {
                const {matchesTournament, badFetch} = await getTournamentMatches(tournamentId);
                if (matchesTournament) {
                    guardarLoaderProgress({width: '100%'});
                    guardarMatchesHoy(matchesTournament);
                    if(matchesTournament.length === 0){   
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
                        <div className="z-depth-5 gradient-position mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
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
                        <div className="z-depth-5 gradient-position mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
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
                <div className="parametros-container menu-background" style={{backgroundColor: '#040c1c'}}>
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
 
export default MatchTorneoApp;