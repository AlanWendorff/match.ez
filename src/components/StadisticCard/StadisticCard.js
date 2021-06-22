import React, {useContext} from 'react';
import { PaletteContext } from '../Context/PaletteContext'
import './StadisticCard.css';

const StadisticCard = ({winRate, winStrike, wl}) => {
    const { palette } = useContext(PaletteContext);

    return ( 
        <div className="noselect stadistic-card-container font-gilroy">
            <div className="container-estadistica">
                <span className="stadistic-span ">Winrate : <span className="font-stadistic-data" style={{color: palette.DarkVibrant}}>{winRate}</span></span>
                <span className="stadistic-span ">Winstrike : <span className="font-stadistic-data" style={{color: palette.DarkVibrant}}>{winStrike}</span> </span>
            </div>
            <div className="win-and-loose" title="Last 5 games">
                {wl.map((status, index) => ( 
                    <span key={index} className={status === "W"? "W-green": "L-red"}>{status}</span>
                ))}
            
            </div>
        </div>
     );
}
 
export default StadisticCard;