import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import Tarjetaversus from '../tarjetas/twoteamscard/MatchPrevio';

const ListadoDeTarjetas = ({matches, teamId}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <Tarjetaversus 
                    match={match}
                    teamId={teamId}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetas;