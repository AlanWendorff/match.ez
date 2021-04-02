import React, { createContext, useState, useEffect} from 'react';
import { usePalette } from 'react-palette';
// creacion del context
export const HeaderLogoContext = createContext();

// provider donde se encuentran las funciones y state's
const HeaderLogoProvider = (props) => {
    const [logo, guardarLogo] = useState('');
    const [paletestate, guardarPaleteCharged] = useState(false);
    let { data, error } = usePalette(logo)

    if (error) {
        data = {
            darkMuted: "#1c313a",
            darkVibrant: "#455a64",
            lightMuted: "#455a64",
            lightVibrant: "#718792",
            muted: "#1c313a",
            vibrant: "#718792",
        }
    }
    
    const {darkMuted} = data;
    useEffect(() => {
        guardarPaleteCharged(false);
        if (darkMuted !== undefined) {
            guardarPaleteCharged(true);
        }
    }, [darkMuted, paletestate, logo]);

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