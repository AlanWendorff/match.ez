import React, { Fragment } from 'react';
import CompetitionCard from './CompetitionCard';
import shortid from 'shortid';


const CompetitionMapping = ({matchesHoy, data }) => {
    
    if (!matchesHoy.length > 0) return null;
        if(navigator.onLine !== true){
            alert('No Internet Connection');
        }else{
            return ( 
                <Fragment> 
                    {
                        matchesHoy.sort(function(a,b){ return  new Date(a.begin_at) - new Date(b.begin_at)  }).map(matchHoy => {
                            return(
                                <CompetitionCard 
                                    key={shortid.generate()}
                                    matchHoy={matchHoy}
                                    data = {data}
                                />
                            );
                        })
                    }
                </Fragment> 
            );
        }
}
 
export default CompetitionMapping;