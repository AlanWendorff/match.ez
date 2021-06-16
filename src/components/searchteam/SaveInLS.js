import React, { useEffect } from 'react';

const SaveInLS = ({collection, SaveOnLS, firstpin}) => {
    useEffect(() => {
        firstpin === true && SaveOnLS(); 
    }, [collection]);

    return <div></div>
}
 
export default SaveInLS;