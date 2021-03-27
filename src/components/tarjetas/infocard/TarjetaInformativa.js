import React from 'react';
import './tarjetaInfo.css';
const TarjetaInformativa = ({noMatches}) => {
    return ( 
        <div className="no-match-card posicion-tarjeta">
            <p className="NO-matches cursor-default">No matches upcoming.</p> 
        </div>
    );   
}

export default TarjetaInformativa;