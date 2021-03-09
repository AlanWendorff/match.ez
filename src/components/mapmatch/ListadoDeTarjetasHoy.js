import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import TarjetaMatchHoy from '../tarjetas/twoteamscard/TarjetaMatchHoy';
import shortid from 'shortid';


const ListadoDeTarjetasHoy = ({matchesHoy, data }) => {
    
    if (!matchesHoy.length > 0) return null;
        if(navigator.onLine !== true){
            alert('No Internet Connection');
        }else{
            return ( 
                <Fragment> 
                    {
                        matchesHoy.sort(function(a,b){ return  new Date(a.begin_at) - new Date(b.begin_at)  }).map(matchHoy => {
                            return(
                                <LazyLoad offset={100} height={100} once key={shortid.generate()}>
                                    <TarjetaMatchHoy 
                                        matchHoy={matchHoy}
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
 
export default ListadoDeTarjetasHoy;