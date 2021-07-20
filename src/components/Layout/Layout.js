import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Tournaments from "../Tournaments/Tournaments";
import HltvRanking from "../HltvRanking/HltvRanking";
import AllMatches from "../AllMatches/AllMatches";
import Timeline from "../Timeline/Timeline";
import Loader from "../Loader/Loader";
import Home from "../Home/Home";
import More from "../More/More";
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
} from "../../routes/routes";

const AllTournaments = lazy(() => import("../AllTournaments/AllTournaments"));
const LeagueGames = lazy(() => import("../LeagueGames/LeagueGames"));
const TeamProfile = lazy(() => import("../TeamProfile/TeamProfile"));
const Warning = lazy(() => import("../Warning/Warning"));
const Contact = lazy(() => import("../Contact/Contact"));
const About = lazy(() => import("../About/About"));
const News = lazy(() => import("../News/News"));

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
                <main
                    onContextMenu={(e) => (window.innerWidth > 1024 ? null : e.preventDefault())}
                    className="background-color-4all"
                >
                    <Switch>
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
                        <Suspense fallback={<Loader />}>
                            <Route exact path={ALL_TOURNAMENTS} component={AllTournaments} />
                            <Route exact path={TOURNAMENT} component={LeagueGames} />
                            <Route exact path={TEAM} component={TeamProfile} />
                            <Route exact path={ERROR} component={Warning} />
                            <Route exact path={CONTACT} component={Contact} />
                            <Route exact path={ABOUT} component={About} />
                            <Route exact path={NEWS} component={News} />
                        </Suspense>
                        
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
