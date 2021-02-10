import React, { createContext, useState, useEffect} from 'react';
import { usePalette } from 'react-palette'

// creacion del context
export const HeaderLogoContext = createContext();

// provider donde se encuentran las funciones y state's
const HeaderLogoProvider = (props) => {

    const [logo, guardarLogo] = useState('');
    const [paletestate, guardarPaleteCharged] = useState(false);
    const { data } = usePalette('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + logo)
    /* const data = {
        darkMuted: "#2a324b",
        darkVibrant: "#0e7a4b",
        lightMuted: "#9cceb7",
        lightVibrant: "#a4d4bc",
        muted: "#64aa8a",
        vibrant: "#b4d43c",
    } */
    const {darkMuted} = data;
    useEffect(() => {
        guardarPaleteCharged(false);
        if (darkMuted !== undefined) {
            guardarPaleteCharged(true);
        }
    }, [darkMuted, paletestate]);

    return(
        <HeaderLogoContext.Provider 
            value={{
                paletestate,
                logo,
                data,
                guardarLogo
            }}
        >
            {props.children}
        </HeaderLogoContext.Provider>
    );
}

export default HeaderLogoProvider