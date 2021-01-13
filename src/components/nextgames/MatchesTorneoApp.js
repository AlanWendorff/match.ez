import React, {useEffect, useState} from 'react';
import { usePalette } from 'react-palette'
import { getTournamentMatches } from './getTournamentMatches';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoDeTarjetasHoy from '../mapmatch/ListadoDeTarjetasHoy';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';

const MatchTorneoApp = ({tournamentId, image_url}) => {

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
            return(
                <div className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
                    <a href="/" title={`Click para volver a la página de inicio`} className="animate__animated animate__fadeInDown animate__faster">  
                        <div className="z-depth-5 gradient-position cursor-pointer" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                            <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                        </div>
                    </a>
                    <div className="home-box">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element pulse"><i className="material-icons">home</i></a> 
                    </div>
                    {noMatches?
                        <TarjetaInformativa
                            noMatches={noMatches}
                        />
                    :
                        <ListadoDeTarjetasHoy
                            matchesHoy={matchesHoy}
                            data = {data}
                        />
                    }
                    <Footer/>
                </div>
            );
        }else{
            return(
                <div className="parametros-container menu-background">
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