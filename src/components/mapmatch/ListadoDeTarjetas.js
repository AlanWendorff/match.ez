import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import Tarjetaversus from '../tarjetas/profileteamcard/Tarjetaversus';

const ListadoDeTarjetas = ({matches, teamid}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <Tarjetaversus 
                    key={match.id}
                    match={match}
                    teamid={teamid}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetas;