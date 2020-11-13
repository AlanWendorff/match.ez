import React, {useContext} from 'react';
import { HeaderLogoContext } from '../../context/HeaderLogoContext'
import './estadisticas.css';

const Estadisitcas = ({winRate, winStrike}) => {
    const { data } = useContext(HeaderLogoContext);

    return ( 
        <div className="col s12 m7 posicion-tarjeta">
            <div className="card horizontal tamano-tarjeta container-estadistica">
                
                <p className="cursor-default font-size estadistic-position font-wins">
                    <span className="margin-content">Porcentaje de victorias : </span>
                    <span className="font-stadistic-data" style={{color: data.vibrant}}>{winRate}</span> 
                </p>

                <p className="cursor-default font-size estadistic-position font-wins">
                    <span className="win-strike margin-content">Racha de victorias : </span>
                    <span className="font-stadistic-data" style={{color: data.vibrant}}>{winStrike}</span> 
                </p>

            </div>
        </div>
     );
}
 
export default Estadisitcas;