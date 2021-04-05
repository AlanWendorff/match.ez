import React, { Fragment } from 'react';
import OneTeamCard from './OneTeamCard';
import LazyLoad from 'react-lazyload';

const OneTeamMapping = ({matches, teamid}) => {
    if (!matches.length > 0) return null;
    return ( 
        <Fragment> 
            {matches.map(match => ( 
                <LazyLoad offset={100} height={100} overflow key={match.id}>
                    <OneTeamCard 
                        match={match}
                        teamid={teamid}
                    />
                </LazyLoad>
        ))}
        </Fragment> 
     );
}
 
export default OneTeamMapping;