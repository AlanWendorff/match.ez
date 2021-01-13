import React, { Fragment } from 'react';
import Tarjetaversus from '../tarjetas/twoteamscard/MatchPrevio';

const ListadoDeTarjetas = ({matches, teamId}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <Tarjetaversus 
                    key={match.id}
                    match={match}
                    teamId={teamId}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetas;