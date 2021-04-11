import React, {useEffect, Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from './components/NavigationBar/NavigationBar';
import TeamProfile from './components/TeamProfile/TeamProfile';
import Tournaments from './components/Tournaments/Tournaments';
import LeagueGames from './components/LeagueGames/LeagueGames';
import ControlRoom from './components/ControlRoom/ControlRoom';
import AllMatches from './components/AllMatches/AllMatches';
import Timeline from './components/Timeline/Timeline';
import Home from './components/Home/Home';
import More from './components/More/More';
import {
  HOME,
  TOURNAMENTS,
  TIMELINE,
  ALLMATCHES,
  MORE,
  CONTROL,
  TOURNAMENT,
  TEAM,
 } from './routes/routes';
import axios from 'axios';

let deferredPrompt; 

const Layout = () => {

  const [isinstalled, setIsInstalled] = useState(false);

  const handleInstallClick = (e) => {
      if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
              //console.log('User accepted the install prompt');
              setIsInstalled(true);
          } else {
              //console.log('User dismissed the install prompt');
          }
        });
      }
  };
  
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
    const LSwakeupBackend = JSON.parse(sessionStorage.getItem('wakeupBackend'));
    if (LSwakeupBackend !== true) {
      (async()=>{
        try {
          const config = {
            method: 'get',
            url: 'https://arg-matchez-backendv2.herokuapp.com/api/wakeup',
            headers: { 
              "Access-Control-Allow-Origin": "*",
            }
          };
          await axios(config);
        } catch (error) {
          //console.log(error);
        }
        try {
          const config = {
            method: 'get',
            url: 'https://arg-matchez-backend.herokuapp.com/api/wakeup',
            headers: { 
              "Access-Control-Allow-Origin": "*",
            }
          };
          await axios(config);
        } catch (error) {

        }
      })()
      sessionStorage.setItem('wakeupBackend', JSON.stringify(true));
    }
  }, []);
  
  return ( 
    <Fragment>
      <Router> 
          <Switch>
            <Route exact path={TOURNAMENTS} component={Tournaments}/>
            <Route exact path={TOURNAMENT} component={LeagueGames}/>
            <Route exact path={ALLMATCHES} component={AllMatches}/>
            <Route exact path={CONTROL} component={ControlRoom}/>
            <Route exact path={TIMELINE} component={Timeline}/>
            <Route exact path={TEAM} component={TeamProfile}/>       
            <Route exact path={MORE}>
              <More 
                handleInstallClick={handleInstallClick}
                setIsInstalled={setIsInstalled}
                isinstalled={isinstalled}
              />
            
            </Route>      
            <Route exact path={HOME} component={Home}/>
          </Switch>
        <footer>
          <NavigationBar/>
        </footer>
      </Router>
    </Fragment>
  );
}

export default Layout;