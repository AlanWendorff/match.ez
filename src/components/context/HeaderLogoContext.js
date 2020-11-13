import React, { createContext, useState} from 'react';
import { usePalette } from 'react-palette'

// creacion del context
export const HeaderLogoContext = createContext();

// provider donde se encuentran las funciones y state's
const HeaderLogoProvider = (props) => {

    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const [logo, guardarLogo] = useState('');
    const { data } = usePalette(proxyUrl + logo);
    // eslint-disable-next-line
    
    return(
        <HeaderLogoContext.Provider 
            value={{
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