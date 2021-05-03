import React, { Fragment, useState, useEffect } from 'react';
import HistoricMatchCard from './HistoricMatchCard';
import LazyLoad from 'react-lazyload';

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamid, setPlayerScore, playerscore}) => {
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
                <LazyLoad offset={100} height={100} overflow key={match.id}>
                    <HistoricMatchCard 
                        firstIndex={firstIndex}
                        match={match}
                        teamId={teamid}
                        setPlayerScore={setPlayerScore}
                        playerscore={playerscore}
                    />
                </LazyLoad>
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetasPartidosPrevios;