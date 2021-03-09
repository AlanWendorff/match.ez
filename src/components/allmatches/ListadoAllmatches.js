import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
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
                            <LazyLoad offset={100} height={100} once key={shortid.generate()}>
                                <TarjetaAllmatches 
                                    match={match}
                                />
                            </LazyLoad>
                        );
                    })
                }
            </Fragment> 
        );
    }
}
 
export default ListadoAllmatches;