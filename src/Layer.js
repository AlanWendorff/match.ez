import React, {useContext} from 'react';
import MatchesApp from './components/teamprofile/MatchesApp';
import HomeScreen from './components/home/HomeScreen';
import Allmatches from './components/allmatches/Allmatches';
import MatchTorneoApp from './components/nextgames/MatchesTorneoApp';
import { PathContext } from './components/context/PathContext';
import { TournamentContext } from './components/context/TournamentContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Layer = () => {

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
              <Route path={`/${team.path}`} key = {team.path}>
                <MatchesApp
                  key  = {team.id}
                  teamId={team.id}
                />
              </Route>
            );                                  
          })
        }
        {   
          tournamentArray.map((tournament) => {
            return(
              <Route path={`/${tournament.name}`} key = {tournament.name}>
                <MatchTorneoApp
                  key  = {tournament.id}
                  tournamentId={tournament.id}
                  image_url={tournament.image_url}
                />
              </Route>
            );                                  
          })
        }
        <Route path="/all-matches" component={Allmatches}/>
        <Route path="/" component={HomeScreen}/>
      </Switch>
    </Router>
  );
}

export default Layer;