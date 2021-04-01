import React, {useEffect, Fragment} from 'react';
import MatchesApp from './components/teamprofile/MatchesApp';
import Home from './components/home2/Home';
import More from './components/more/More';
import Tournaments from './components/tournaments/Tournaments';
import Allmatches from './components/allmatches/Allmatches';
import MatchTorneoApp from './components/nextgames/MatchesTorneoApp';
import Timeline from './components/timeline/Timeline';
import Control from './components/controlroom/Control';
import NavigationBar from './components/navigationbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

const Layout = () => {
  
  useEffect(() => {
    const LSwakeupBackend = JSON.parse(sessionStorage.getItem('wakeupBackend'));
    if (LSwakeupBackend !== true) {
      (async()=>{
        try {
          const config = {
            method: 'get',
            url: 'https://arg-matchez-backend.herokuapp.com/api/wakeup',
            headers: { 
              "Access-Control-Allow-Origin": "*",
            }
          };
          await axios(config);
          //const res = 
          //const firstCall = res.data;
          //console.log(firstCall);
        } catch (error) {
          //console.log(error);
        }
        try {
          const config = {
            method: 'get',
            url: 'https://arg-matchez-backendv2.herokuapp.com/api/wakeup',
            headers: { 
              "Access-Control-Allow-Origin": "*",
            }
          };
          await axios(config);
          //const res = 
          //const firstCall = res.data;
          //console.log(firstCall);
        } catch (error) {
          //console.log(error);
        }
      })()
      sessionStorage.setItem('wakeupBackend', JSON.stringify(true));
    }
  }, []);
  
  return ( 
    <Fragment>
      <Router> 
          <Switch>
            <Route exact path={CONTROL} component={Control}/>
            <Route exact path={TEAM} component={MatchesApp}/>
            <Route exact path={TOURNAMENT} component={MatchTorneoApp}/>
            <Route exact path={MORE} component={More}/>
            <Route exact path={TOURNAMENTS} component={Tournaments}/>
            <Route exact path={TIMELINE} component={Timeline}/>
            <Route exact path={ALLMATCHES} component={Allmatches}/>
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