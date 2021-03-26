import React, { Fragment, useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import MatchPrevio from '../tarjetas/twoteamscard/MatchPrevio';

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamId, scoreMatch}) => {
    const [droplist, setDropList] = useState(false);
    const [arrayMatches, setArrayMatches] = useState([]);
    const [firstIndexDate, setFirstIndexDate] = useState("");

    useEffect(() => {
        const firstMatch = prevMatch[0];
        const {id} = firstMatch;
        setFirstIndexDate(id);
        if (droplist === false) {
            setArrayMatches([firstMatch]);
        }else{
            setArrayMatches(prevMatch);
        }
    }, [droplist]);

    if (!prevMatch.length > 0) return null;

    return ( 
        <Fragment> 
            {arrayMatches.map(match => ( 
                <MatchPrevio 
                    key={match.id}
                    firstIndexDate={firstIndexDate}
                    match={match}
                    teamId={teamId}
                    setDropList={setDropList}
                    droplist={droplist}
                    scoreMatch={scoreMatch}
                />
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetasPartidosPrevios;