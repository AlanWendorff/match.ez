import React, {useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeamProfile from './components/TeamProfile/TeamProfile';
import Home from './components/Home/Home';
import More from './components/More/More';
import Tournaments from './components/Tournaments/Tournaments';
import AllMatches from './components/AllMatches/AllMatches';
import LeagueGames from './components/LeagueGames/LeagueGames';
import Timeline from './components/Timeline/Timeline';
import ControlRoom from './components/ControlRoom/ControlRoom';
import NavigationBar from './components/NavigationBar/NavigationBar';
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
            <Route exact path={CONTROL} component={ControlRoom}/>
            <Route exact path={TEAM} component={TeamProfile}/>
            <Route exact path={TOURNAMENT} component={LeagueGames}/>
            <Route exact path={MORE} component={More}/>
            <Route exact path={TOURNAMENTS} component={Tournaments}/>
            <Route exact path={TIMELINE} component={Timeline}/>
            <Route exact path={ALLMATCHES} component={AllMatches}/>
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