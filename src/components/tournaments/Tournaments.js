import React, { useState, Fragment, useEffect, useContext } from 'react';
import Item from './Item';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import { ColorThemeContext } from '../context/ColorThemeContext';
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

    const { colors } = useContext(ColorThemeContext);
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);
    console.log(objectToArray);
    return (colors.background_color !== undefined?
        <div className="tournament-container font-gilroy"  style={{backgroundColor: colors.background_color}}>
            <Link className="tournament-size z-depth-5 cursor-pointer animate__animated animate__fadeInDown animate__faster" to={UNITY} title={LOOKUNITY}>
                <Item
                    customTournament={customTournament}
                />
            </Link>
            {objectToArray.length > 0 &&
                objectToArray.map(tournament => (
                    <Link className="tournament-size z-depth-5 cursor-pointer animate__animated animate__fadeInDown animate__faster" to={`/${tournament.path}`} title={`${LOOKMATCHES} ${tournament.name}`} key={tournament.id}>
                        <Item
                            key={tournament.id}
                            tournament={tournament}
                        />
                    </Link>
                ))
            }
        </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default Tournaments;
