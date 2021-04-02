import React, { Fragment } from 'react';
import OneTeamCard from './OneTeamCard';

const OneTeamMapping = ({matches, teamid}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <OneTeamCard 
                    key={match.id}
                    match={match}
                    teamid={teamid}
                />
        ))}
        </Fragment> 
     );
}
 
export default OneTeamMapping;