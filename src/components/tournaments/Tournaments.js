import React, { Fragment, useContext } from 'react';
import LazyLoad from 'react-lazyload';
import Item from './Item';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../context/TournamentContext';
import {
    UNITY
} from '../../routes/routes';
import {
    LOOKUNITY,
    LOOKMATCHES
} from '../../titlestag/titlestag';
import {
    customTournament
} from '../../custom/unity/unity-flow-league-schedule';
import './tournaments.css';

const Tournaments = () => {
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);

    return (objectToArray > 0 &&
        <Fragment> 
            <Link className="tournament-size z-depth-5 cursor-pointer real-button" to={UNITY} title={LOOKUNITY}>
                <Item
                    customTournament={customTournament}
                />
            </Link>
            {
                objectToArray.map(tournament => (
                    <Link className="tournament-size z-depth-5 cursor-pointer real-button" to={`/${tournament.path}`} title={`${LOOKMATCHES} ${tournament.name}`} key={tournament.id}>
                        <LazyLoad offset={100} height={100} once>
                            <Item
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
 
export default Tournaments;
