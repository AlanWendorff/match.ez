import React, { Fragment, useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import MatchPrevio from '../tarjetas/twoteamscard/MatchPrevio';
import ReactNotification from 'react-notifications-component'

const ListadoDeTarjetasPartidosPrevios = ({prevMatch, teamId, scoreMatch}) => {
    const [droplist, setDropList] = useState(false);
    const [arrayMatches, setArrayMatches] = useState([]);
    const [firstIndexDate, setFirstIndexDate] = useState("");
    
    const allMatch = {
        title: "Todos los Partidos Jugados",
        message: "Estas viendo los últimos partidos jugados",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInRightBig", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOutRightBig", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
    };

    const oneMatch = {
        title: "Último Partido",
        message: "Estas viendo el último partido",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
    };

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
            <ReactNotification />
            {arrayMatches.map(match => ( 
                <LazyLoad offset={100} height={100} once key={match.id}>
                    <MatchPrevio 
                        firstIndexDate={firstIndexDate}
                        match={match}
                        teamId={teamId}
                        setDropList={setDropList}
                        droplist={droplist}
                        scoreMatch={scoreMatch}
                        oneMatch={oneMatch}
                        allMatch={allMatch}
                    />
                </LazyLoad>
        ))}
        </Fragment> 
     );
}
 
export default ListadoDeTarjetasPartidosPrevios;