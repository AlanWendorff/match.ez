import React, { useEffect, Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LeagueGames from "./components/LeagueGames/LeagueGames";
import Tournaments from "./components/Tournaments/Tournaments";
import HltvRanking from "./components/HltvRanking/HltvRanking";
import TeamProfile from "./components/TeamProfile/TeamProfile";
import AllMatches from "./components/AllMatches/AllMatches";
import Timeline from "./components/Timeline/Timeline";
import NotFound from "./components/NotFound/NotFound";
import Warning from "./components/Warning/Warning"
import News from "./components/News/News";
import Home from "./components/Home/Home";
import More from "./components/More/More";
import {
  HOME,
  TOURNAMENTS,
  TIMELINE,
  ALLMATCHES,
  MORE,
  TOURNAMENT,
  TEAM,
  RANKING,
  NEWS,
  ERROR
} from "./routes/routes";

let deferredPrompt;

const Layout = () => {
  const [isinstalled, setIsInstalled] = useState(false);

  const handleInstallClick = (e) => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
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
  }, []);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={TOURNAMENTS} component={Tournaments} />
          <Route exact path={TOURNAMENT} component={LeagueGames} />
          <Route exact path={ALLMATCHES} component={AllMatches} />
          <Route exact path={RANKING} component={HltvRanking} />
          <Route exact path={TIMELINE} component={Timeline} />
          <Route exact path={TEAM} component={TeamProfile} />
          <Route exact path={NEWS} component={News} />
          <Route exact path={MORE}>
            <More
              handleInstallClick={handleInstallClick}
              setIsInstalled={setIsInstalled}
              isinstalled={isinstalled}
            />
          </Route>
          <Route exact path={ERROR} component={Warning} />
          <Route exact path={HOME} component={Home} />
          <Route component={NotFound} />
        </Switch>
        <footer>
          <NavigationBar />
        </footer>
      </Router>
    </Fragment>
  );
};

export default Layout;
