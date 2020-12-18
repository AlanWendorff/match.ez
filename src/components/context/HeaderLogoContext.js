import React, { createContext, useState, useEffect} from 'react';
import { usePalette } from 'react-palette'

// creacion del context
export const HeaderLogoContext = createContext();

// provider donde se encuentran las funciones y state's
const HeaderLogoProvider = (props) => {

    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const [logo, guardarLogo] = useState('');
    const [paletestate, guardarPaleteCharged] = useState(false);
    const { data } = usePalette(proxyUrl + logo);
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