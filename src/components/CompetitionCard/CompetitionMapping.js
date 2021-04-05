import React, { Fragment } from 'react';
import CompetitionCard from './CompetitionCard';
import LazyLoad from 'react-lazyload';

const CompetitionMapping = ({matchesHoy, data }) => {
    
    if (!matchesHoy.length > 0) return null;
        if(navigator.onLine !== true){
            alert('No Internet Connection');
        }else{
            return ( 
                <Fragment> 
                    {
                        matchesHoy.sort(function(a,b){ return  new Date(a.begin_at) - new Date(b.begin_at)  }).map(match => {
                            return(
                                <LazyLoad offset={100} height={100} overflow key={match.id}>
                                    <CompetitionCard 
                                        match={match}
                                        data = {data}
                                    />
                                </LazyLoad>
                            );
                        })
                    }
                </Fragment> 
            );
        }
}
 
export default CompetitionMapping;