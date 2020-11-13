import React, {useEffect, useState} from 'react';
import { usePalette } from 'react-palette'
import ListadoDeTarjetasHoy from '../mapmatch/ListadoDeTarjetasHoy';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import csgoLogo from '../../LogoTeams/csgoLogo.png';

const MatchTorneoApp = ({tournamentId, image_url}) => {

    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const { data } = usePalette(`https://cors-anywhere.herokuapp.com/` + image_url);

    useEffect(() => { 
        const consultarAPI = async () => {   
            const proxyUrl = `https://cors-anywhere.herokuapp.com/`;    //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                                                         
            const urlLiga  = `https://api.pandascore.co/csgo/matches?filter[league_id]=${tournamentId}&sort=begin_at&filter[status]=not_started,running&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
            try {
                const respuestaLiga = await fetch(proxyUrl + urlLiga);       
                if (respuestaLiga.status !== 200){
                    guardarStateCrash(true);
                };
                const objetoLiga = await respuestaLiga.json();
                guardarLoaderProgress({width: '100%'});
                guardarMatchesHoy(objetoLiga); 

            } catch (error) {
                guardarStateCrash(true);      
            };
        };
        
        if(!matchesHoy.length > 0){                       // validates the content of the request to stop the request 
            consultarAPI();
            guardarLoaderProgress({width: '20%'});
        };   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const {width} = loaderprogress;
    if (crash !== true){
        if(width === '100%' && matchesHoy.length > 0){
            return(
                <div className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                    <a href="/" title={`Click para volver a la página de inicio`}>  
                        <div className="z-depth-5 gradient-position cursor-pointer" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                        </div>
                    </a>
                    <div className="home-box">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element pulse"><i className="material-icons">home</i></a> 
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
                <div className="parametros-container menu-background">
                    <a href="/">
                        <div className="z-depth-5 gradient-position menu-banner cursor-pointer"> 
                            <img title={`Click para volver a la página de inicio`} className="max-size-logo-header kaster-shadow" alt="Logo Team" src={csgoLogo}/>   
                        </div>
                    </a>
                    <div className="home-box">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element pulse"><i className="material-icons">home</i></a> 
                    </div>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    /> 
                    <Footer/>
                </div>
            );
        };
    }else{
        return(
            <div className="parametros-container menu-background">
                <a href="/">
                    <div className="z-depth-5 gradient-position menu-banner cursor-pointer"> 
                        <img title={`Click para volver a la página de inicio`} className="max-size-logo-header kaster-shadow" alt="Logo Team" src={csgoLogo}/>   
                    </div>
                </a>         
                <div className="home-box">
                    <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element pulse"><i className="material-icons">home</i></a> 
                </div>
                <Warning/> 
                <Footer/>
            </div>
        );
    };   
    
}
 
export default MatchTorneoApp;