import React, {useEffect, useState} from 'react';
import { getTournamentMatches } from './getTournamentMatches';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import csgoLogoDefault from '../../ImagenesVarias/csgoLogoDefault.png';
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
    const { data } = usePalette('https://proxy-kremowy.herokuapp.com/' + image_url)
    const {darkMuted} = data;
    
    useEffect(() => { 
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const {width} = loaderprogress;

    if (matchesHoy.length > 0) {
        //img: winner.image_url !== null? winner.image_url :  csgoLogoDefault,
        let array = [];
        let array2 = [];
        matchesHoy.map(match => {
            const {winner} = match;
            array.push(
                {
                    name: winner.name,
                    img: winner.image_url !== null? winner.image_url :  csgoLogoDefault,
                }
            );
        });
        //console.log(array);

        function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                 const key = keyGetter(item);
                 const collection = map.get(key);
                 if (!collection) {
                     map.set(key, [item]);
                 } else {
                     collection.push(item);
                 }
            });
            return map;
        };

        array.map(team => {
            const grouped = groupBy(array, team => team.name);
            const gettedTeam = grouped.get(team.name)
            array2.push(
                {
                    name: gettedTeam[0].name,
                    img: gettedTeam[0].img,
                    points: gettedTeam.length,
                }
            );
        });

        console.log(array2);
    }

    if (crash !== true){
        if(width === '100%' && paletestate === true){
            if(noMatches !== true){
                //const live = matchesHoy.filter(match => match.status === "running");
                //const hoy = matchesHoy.filter(match => match.begin_at === "running");
                //const proximamente = matchesHoy.filter(match => match.status === "running");
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
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
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: data.darkVibrant}}>
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