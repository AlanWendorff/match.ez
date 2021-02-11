import React, {useEffect, useState} from 'react';
import { getAllmatches } from './getAllmatches.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoAllmatches from './ListadoAllmatches';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import icon from '../../ImagenesVarias/Icon.png';
import { getStyles } from '../home/getStyles/firebaseStyles';

const Allmatches = () => {

    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [allmatches, guardarAllmatches] = useState([]);
    const styles = getStyles();
    
    useEffect(() => { 
        /* getColor(); */
        (async () => {
            if (!allmatches.length > 0) {
                const {AllMatches, badFetch} = await getAllmatches();
                if (AllMatches) {
                    guardarLoaderProgress({width: '100%'});
                    guardarAllmatches(AllMatches);
                    if(AllMatches.length === 0){   
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
        if(width === '100%'){
            if(noMatches !== true){
                return(
                    <div className="parametros-container menu-background" style={{backgroundColor: styles.background_color}}>
                        <div className="z-depth-5 gradient-menu animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${styles.header_color} 100%)`}}> 
                            <img className="max-size-logo-header white-neon" alt="Logo Team" src={icon}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon icon={faChevronCircleLeft}/></a>
                        </div>
                        <div className="home-box">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                        </div>

                        <ListadoAllmatches allmatches={allmatches}/>
                        <Footer/>
                    </div>
                );
            }else{
                return(
                    <div className="parametros-container menu-background" style={{backgroundColor: styles.background_color}}>
                        <div className="z-depth-5 gradient-menu animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${styles.header_color} 100%)`}}> 
                            <img className="max-size-logo-header white-neon" alt="Logo Team" src={icon}/>   
                            <a href="/" className="back-to-home"><FontAwesomeIcon icon={faChevronCircleLeft}/></a>
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
                <div className="parametros-container menu-background" style={{backgroundColor: styles.background_color}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    /> 
                </div>
            );
        };
    }else{
        return(
            <div className="parametros-container menu-background" style={{backgroundColor: styles.background_color}}>       
                <Warning/> 
                <Footer/>
            </div>
        );
    };   
        
}
export default Allmatches;