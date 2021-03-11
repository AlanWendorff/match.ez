import React, { createContext, useState, useEffect } from 'react';
import firebase from '../../utility/FirebaseConfig';

const database = firebase.database();

// creacion del context
export const PathContext = createContext();

// provider donde se encuentran las funciones y state's
const PathProvider = (props) => {

    const [paths, guardarPath] = useState([]);

    useEffect(() => {  
        database.ref('paths').on('value',(snap)=>{
        guardarPath(snap.val());
        });
        
    },[]);//Hacemos que ejecute una sola vez
    
    return(
        <PathContext.Provider 
            value={{paths}}
        >
            {props.children}
        </PathContext.Provider>
    );
}

export default PathProvider