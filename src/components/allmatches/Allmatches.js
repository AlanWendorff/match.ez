import React, {useEffect, useState, useContext} from 'react';
import { getAllmatches } from './getAllmatches.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoAllmatches from './ListadoAllmatches';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import icon from '../../ImagenesVarias/Icon.png';
import { ColorThemeContext } from '../context/ColorThemeContext';
import './allmatches.css';

const Allmatches = () => {
    const { colors } = useContext(ColorThemeContext);
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [allmatches, guardarAllmatches] = useState([]);
    
    useEffect(() => { 
        (async () => {
            if (!allmatches.length > 0) {
                const {AllMatches, badFetch} = await getAllmatches();
                if (AllMatches) {
                    guardarLoaderProgress({width: '100%'});
                    const matchesFiltered = AllMatches.filter(status => status.status !== "canceled");
                    guardarAllmatches(matchesFiltered);
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
    if (colors !== undefined) {
        if (crash !== true){
            if(width === '100%'){
                if(noMatches !== true){
                    return(
                        <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="allmatches" style={{backgroundColor: colors.background_color}}>
                            <ListadoAllmatches allmatches={allmatches}/>
                            <Footer/>
                        </div>
                    );
                }else{
                    return(
                        <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="allmatches" style={{backgroundColor: colors.background_color}}>
                            <TarjetaInformativa
                                noMatches={noMatches}
                            />
                            <Footer/>
                        </div>
                    );
                }
            }else{
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="allmatches" style={{backgroundColor: colors.background_color}}>
                        <LoadScreen
                            loaderprogress={loaderprogress}
                        /> 
                    </div>
                );
            };
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="allmatches" style={{backgroundColor: colors.background_color}}>       
                    <Warning/> 
                    <Footer/>
                </div>
            );
        };   
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="allmatches">
                <SimpleLoadScreen/>
            </div>
        );
    };
        
}
export default Allmatches;