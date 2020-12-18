import React from 'react';
import Layer from './Layer';
import TournamentProvider from './components/context/TournamentContext';
import PathProvider from './components/context/PathContext';
import HeaderLogoProvider from './components/context/HeaderLogoContext';
import LoaderProvider from './components/context/LoaderContext';

const App = () => {  
  if(navigator.onLine !== true){
    alert('No Internet Connection');
  }else{
    return(
      <PathProvider>
        <HeaderLogoProvider>
          <LoaderProvider>
            <TournamentProvider>
                <Layer/>
            </TournamentProvider>
          </LoaderProvider>
        </HeaderLogoProvider>
      </PathProvider>
    );
  };
}

export default App;