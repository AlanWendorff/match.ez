import React, { Fragment } from 'react';
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
                                <TarjetaMatchHoy 
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
 
export default ListadoDeTarjetasHoy;