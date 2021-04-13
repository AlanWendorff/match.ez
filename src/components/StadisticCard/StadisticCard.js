import React, {useContext} from 'react';
import { HeaderLogoContext } from '../Context/HeaderLogoContext'
import './estadisticas.css';

const StadisticCard = ({winRate, winStrike, wl}) => {
    const { data } = useContext(HeaderLogoContext);

    return ( 
        <div className="noselect stadistic-card-container font-gilroy">
            <div className="container-estadistica">
                <span className="stadistic-span ">Winrate : <span className="font-stadistic-data" style={{color: data.darkVibrant}}>{winRate}</span></span>
                <span className="stadistic-span ">Winstrike : <span className="font-stadistic-data" style={{color: data.darkVibrant}}>{winStrike}</span> </span>
            </div>
            <div className="win-and-loose" title="Last 5 games">
                {wl.map(status => ( 
                    <span className={status === "W"? "W-green": "L-red"}>{status}</span>
                ))}
            
            </div>
        </div>
     );
}
 
export default StadisticCard;