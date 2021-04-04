import React, { Fragment, useState, useEffect } from 'react';
import HistoricMatchCard from './HistoricMatchCard';

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamid, setPreview, setPlayerScore, playerscore}) => {
    const [firstIndex, setFirstIndex] = useState("");
    
    useEffect(() => {
        const firstMatch = prevMatch[0];
        const {id} = firstMatch;
        setFirstIndex(id);
    }, []);

    if (!prevMatch.length > 0) return null;

    return ( 
        <Fragment> 
            {prevMatch.map(match => ( 
                <HistoricMatchCard 
                    key={match.id}
                    firstIndex={firstIndex}
                    match={match}
                    teamId={teamid}
                    setPreview={setPreview}
                    setPlayerScore={setPlayerScore}
                    playerscore={playerscore}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetasPartidosPrevios;