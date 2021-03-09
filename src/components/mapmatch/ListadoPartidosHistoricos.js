import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import Tarjetaversus from '../tarjetas/twoteamscard/MatchPrevio';

const ListadoDeTarjetas = ({matches, teamId}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <LazyLoad offset={100} height={100} once key={match.id}>
                    <Tarjetaversus 
                        match={match}
                        teamId={teamId}
                    />
                </LazyLoad>
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetas;