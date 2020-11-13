import React, { createContext, useState, useEffect } from 'react';
import FirebaseConfig from '../../utility/FirebaseConfig';

const database = FirebaseConfig();

// creacion del context
export const TournamentContext = createContext();

// provider donde se encuentran las funciones y state's
const TournamentProvider = (props) => {

    const [tournamentId, guardarTournamentId] = useState([]);

    useEffect(() => {  
        database.ref('tournament').on('value',(snap)=>{
        guardarTournamentId(snap.val());
        });
    },[]);//Hacemos que ejecute una sola vez

    return(
        <TournamentContext.Provider 
            value={{tournamentId, database}}
        >
            {props.children}
        </TournamentContext.Provider>
    );
}

export default TournamentProvider