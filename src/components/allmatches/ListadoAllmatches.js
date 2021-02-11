import React, { Fragment } from 'react';
import TarjetaAllmatches from './TarjetaAllmatches';
import shortid from 'shortid';

const ListadoAllmatches = ({allmatches}) => {
    if (!allmatches.length > 0) return null;

    if(navigator.onLine !== true){
        alert('No Internet Connection');
    }else{
        return ( 
            <Fragment> 
                {
                    allmatches.sort(function(a,b){ return  new Date(a.begin_at) - new Date(b.begin_at)  }).map(match => {
                        return(
                            <TarjetaAllmatches 
                                key={shortid.generate()}
                                match={match}
                            />
                        );
                    })
                }
            </Fragment> 
        );
    }
}
 
export default ListadoAllmatches;