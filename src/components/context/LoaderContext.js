import React, { createContext, useState} from 'react';

// creacion del context
export const LoaderContext = createContext();

// provider donde se encuentran las funciones y state's
const LoaderProvider = (props) => {

    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    
    return(
        <LoaderContext.Provider 
            value={{
                loaderprogress,
                guardarLoaderProgress
            }}
        >
            {props.children}
        </LoaderContext.Provider>
    );
}

export default LoaderProvider