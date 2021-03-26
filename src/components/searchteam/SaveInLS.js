import React, { useEffect } from 'react';

const SaveInLS = ({collection, SaveOnLS, firstpin}) => {
    useEffect(() => {
        //console.log('loop de effect'); 

        firstpin === true && SaveOnLS(); 

    }, [collection]);

    return (<div></div>);
}
 
export default SaveInLS;