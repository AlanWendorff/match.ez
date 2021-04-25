import React, { useContext } from 'react';
import { ColorThemeContext } from '../Context/ColorThemeContext';
import { TournamentContext } from '../Context/TournamentContext';

import SimpleLoadScreen from '../Loader/SimpleLoadScreen';
import Item from './Item';
import './tournaments.css';

const Tournaments = () => {

    const { colors } = useContext(ColorThemeContext);
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);

    return (colors.background_color !== undefined?
        
            <div className="tournament-container font-gilroy" style={{backgroundColor: colors.background_color}} onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>
                <div className="child-tournament">
                    {objectToArray.length > 0 &&
                        objectToArray.map(tournament => (
                            <Item tournament={tournament} key={tournament.id}/>
                        ))
                    }
                </div>
            </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default Tournaments;
