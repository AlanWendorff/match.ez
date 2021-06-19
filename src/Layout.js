import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllTournaments from "./components/AllTournaments/AllTournaments";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Tournaments from "./components/Tournaments/Tournaments";
import HltvRanking from "./components/HltvRanking/HltvRanking";
import AllMatches from "./components/AllMatches/AllMatches";
import Timeline from "./components/Timeline/Timeline";
import Home from "./components/Home/Home";
import More from "./components/More/More";
import BlackScreen from "./components/Loader/BlackScreen";
import {
    HOME,
    ALL_TOURNAMENTS,
    TOURNAMENTS,
    TIMELINE,
    ALLMATCHES,
    MORE,
    CONTACT,
    TOURNAMENT,
    TEAM,
    RANKING,
    NEWS,
    ERROR,
    ABOUT,
} from "./routes/routes";

const LeagueGames = lazy(() => import("./components/LeagueGames/LeagueGames"));
const TeamProfile = lazy(() => import("./components/TeamProfile/TeamProfile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Warning = lazy(() => import("./components/Warning/Warning"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const About = lazy(() => import("./components/About/About"));
const News = lazy(() => import("./components/News/News"));

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
        <>
            <Router>
                <main onContextMenu={(e) => (window.innerWidth > 1024 ? null : e.preventDefault())}>
                    <Switch>
                        <Route exact path={ALL_TOURNAMENTS} component={AllTournaments} />
                        <Route exact path={TOURNAMENTS} component={Tournaments} />
                        <Route exact path={ALLMATCHES} component={AllMatches} />
                        <Route exact path={RANKING} component={HltvRanking} />
                        <Route exact path={TIMELINE} component={Timeline} />
                        <Route exact path={MORE}>
                            <More
                                handleInstallClick={handleInstallClick}
                                setIsInstalled={setIsInstalled}
                                isinstalled={isinstalled}
                            />
                        </Route>
                        <Route exact path={HOME} component={Home} />

                        <Suspense fallback={<BlackScreen />}>
                            <Route exact path={TOURNAMENT} component={LeagueGames} />
                            <Route exact path={TEAM} component={TeamProfile} />
                            <Route exact path={ERROR} component={Warning} />
                            <Route exact path={CONTACT} component={Contact} />
                            <Route exact path={ABOUT} component={About} />
                            <Route exact path={NEWS} component={News} />
                        </Suspense>
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <footer onContextMenu={(e) => (window.innerWidth > 1024 ? null : e.preventDefault())}>
                    <NavigationBar />
                </footer>
            </Router>
        </>
    );
};

export default Layout;
