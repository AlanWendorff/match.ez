import React, { Fragment, useContext } from 'react';
import Tournament from './Tournament';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../context/TournamentContext'
import './tournament.css';

const ListadoDeTorneos = () => {
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);
    if (!objectToArray.length > 0) return null;
    return ( 
        <Fragment> 
            {
                objectToArray.map(tournament => (
                    <Link className="tournament-size z-depth-5 cursor-pointer real-button" to={`/${tournament.name}`} title={`Ver el partidos de la ${tournament.name}`} key={tournament.id}>
                        <Tournament
                            key={tournament.id}
                            tournament={tournament}
                        />
                    </Link>
                    
                ))
            }
        </Fragment> 
     );
}
 
export default ListadoDeTorneos;