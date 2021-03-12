import React, { Fragment, useContext, useState, useEffect } from 'react';
import Tournament from './Tournament';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../context/TournamentContext'
import './tournament.css';

const customTournament = {img: "https://i.ibb.co/H4BqgkX/LVP-Unity-league-flow.png", name: "Unity League Flow"}

const ListadoDeTorneos = () => {
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);

    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        setTournaments(objectToArray);
    }, [objectToArray.length]);

    if (!objectToArray.length > 0) return null;
    return ( 
        <Fragment> 
            <Link className="tournament-size z-depth-5 cursor-pointer real-button" to={'/unity-league'} title={`Ver el partidos de la Unity League`}>
                <Tournament
                    customTournament={customTournament}
                />
            </Link>
            {
                tournaments.map(tournament => (
                    <Link className="tournament-size z-depth-5 cursor-pointer real-button" to={`/${tournament.path}`} title={`Ver el partidos de la ${tournament.name}`} key={tournament.id}>
                        <LazyLoad offset={100} height={100} once>
                            <Tournament
                                key={tournament.id}
                                tournament={tournament}
                            />
                        </LazyLoad>
                    </Link>
                ))
            }
        </Fragment> 
     );
}
 
export default ListadoDeTorneos;