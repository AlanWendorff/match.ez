import React, { Fragment, useState, useEffect } from 'react';
import HistoricMatchCard from './HistoricMatchCard';

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamId, scoreMatch}) => {
    const [firstIndexDate, setFirstIndexDate] = useState("");

    useEffect(() => {
        const firstMatch = prevMatch[0];
        const {id} = firstMatch;
        setFirstIndexDate(id);
    }, []);

    if (!prevMatch.length > 0) return null;

    return ( 
        <Fragment> 
            {prevMatch.map(match => ( 
                <HistoricMatchCard 
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