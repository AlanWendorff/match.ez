import React from 'react';
import Layer from './Layer';
import TournamentProvider from './components/context/TournamentContext';
import PathProvider from './components/context/PathContext';
import HeaderLogoProvider from './components/context/HeaderLogoContext';
const App = () => {  
  if(navigator.onLine !== true){
    alert('No Internet Connection');
  }else{
    return(
      <PathProvider>
        <HeaderLogoProvider>
          <TournamentProvider>
              <Layer/>
          </TournamentProvider>
        </HeaderLogoProvider>
      </PathProvider>
    );
  };
}

export default App;