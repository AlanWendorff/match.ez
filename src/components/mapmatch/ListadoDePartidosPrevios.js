import React, { Fragment, useState, useEffect } from 'react';
import MatchPrevio from '../tarjetas/twoteamscard/MatchPrevio';

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamId, scoreMatch}) => {
    const [firstIndexDate, setFirstIndexDate] = useState("");

    useEffect(() => {
        const firstMatch = prevMatch[0];
        const {id} = firstMatch;
        setFirstIndexDate(id);
    }, []);

    if (!prevMatch.length > 0) return null;
    console.log(prevMatch);
    return ( 
        <Fragment> 
            {prevMatch.map(match => ( 
                <MatchPrevio 
                    key={match.id}
                    firstIndexDate={firstIndexDate}
                    match={match}
                    teamId={teamId}
                    scoreMatch={scoreMatch}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetasPartidosPrevios;