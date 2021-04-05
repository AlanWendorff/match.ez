import React, { createContext, useState, useEffect} from 'react';
import firebase from '../../utility/FirebaseConfig';
const database = firebase.database();
export const ColorThemeContext = createContext();

const ColorThemeProvider = (props) => {

    const [colors, setColors] = useState([]);

    useEffect(() => {
        database.ref('styles').on('value',(snap)=>{
            setColors(snap.val());
        });
    }, []);

    return(
        <ColorThemeContext.Provider 
            value={{
                colors
            }}
        >
            {props.children}
        </ColorThemeContext.Provider>
    );
}

export default ColorThemeProvider