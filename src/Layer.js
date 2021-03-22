import React, {useContext, useEffect} from 'react';
import MatchesApp from './components/teamprofile/MatchesApp';
import HomeScreen from './components/home/HomeScreen';
import Allmatches from './components/allmatches/Allmatches';
import MatchTorneoApp from './components/nextgames/MatchesTorneoApp';
import Timeline from './components/timeline/Timeline';
import Control from './components/controlroom/Control';
import { PathContext } from './components/context/PathContext';
import { TournamentContext } from './components/context/TournamentContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { unity_info } from './custom/unity/unity-flow-league-schedule';
import firebase from './utility/FirebaseConfig';
import axios from 'axios';
const Layer = () => {
  const database = firebase.database();

  useEffect(() => {
    const LSwakeupBackend = JSON.parse(localStorage.getItem('wakeupBackend'));
    if (LSwakeupBackend !== true) {
      //console.log("llamo a backend");
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
      localStorage.setItem('wakeupBackend', JSON.stringify(true));
    }
    window.addEventListener("beforeunload", function () {
      localStorage.removeItem('wakeupBackend');
      return undefined;
    });
  }, []);
  
  const { tournamentId } = useContext(TournamentContext);
  const tournamentArray = Object.values(tournamentId);
  const { paths } = useContext(PathContext);
  const pathsArray = Object.values(paths);

  return ( 
    <Router> 
      <Switch>
        {
          pathsArray.map((team) => {
            return(
              <Route exact path={`/${team.path}`} key={team.path}>
                <MatchesApp
                  key={team.id}
                  teamId={team.id}
                  name={team.name}
                  image_url={team.img}
                />
              </Route>
            );                                  
          })
        }
        {
          tournamentArray.map((tournament) => {
            return(
              <Route exact path={`/${tournament.path}`} key={tournament.name}>
                <MatchTorneoApp
                  key={tournament.id}
                  tournamentId={tournament.id}
                  image_url={tournament.image_url}
                />
              </Route>
            );                    
          })
        }

        <Route exact path="/control-room">
          <Control
            tournamentArray={tournamentArray}
            pathsArray={pathsArray}
            database={database}
          />
        </Route>
        
        <Route exact path="/unity-league">
          <MatchTorneoApp
            image_url={unity_info.image_url}
          />
        </Route>
        
        <Route exact path="/time-line" component={Timeline}/>
        <Route exact path="/all-matches" component={Allmatches}/>
        <Route exact path="/" component={HomeScreen}/>
      </Switch>
    </Router>
  );
}

export default Layer;