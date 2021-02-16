import React, {useContext} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import './estadisticas.css';

const Estadisitcas = ({winRate, winStrike}) => {
    const { data } = useContext(HeaderLogoContext);

    return ( 
        <div className="noselect col s12 m7 posicion-tarjeta">
            <div className="card horizontal tamano-tarjeta container-estadistica">
                
                <span className="stadistic-span">Porcentaje de victorias : <span className="font-stadistic-data" style={{color: data.vibrant}}>{winRate}</span></span>

                <span className="stadistic-span">Racha de victorias : <span className="font-stadistic-data" style={{color: data.vibrant}}>{winStrike}</span> </span>
            </div>
        </div>
     );
}
 
export default Estadisitcas;