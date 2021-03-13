import React, { useState, Fragment, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";
import Footer from '../footer/Footer';
import TeamsHome from './TeamsHome';
import TeamCollection from './teamdirectacces/TeamCollection';
import ListadoDeTorneos from './ListadoDeTorneos';
import Search from './searchTeam/Search';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import icon from '../../ImagenesVarias/Icon.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDownload, faFistRaised, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { getStyles } from './getStyles/firebaseStyles';
import './menu.css';
import './tournament.css';
let deferredPrompt;  

const HomeScreen = () => {

    const [navbar, setNavBar] = useState(true);
    const [teambuttonstyle, setTeamButtonStyle] = useState({backgroundColor: '#ffffff4d'});
    const [tournamentbuttonstyle, setTournamentButtonStyle] = useState({backgroundColor: '#ffffff00'});
    const [collection, setCollection] = useState([]);
    const [installable, setInstallable] = useState(false);
    const styles = getStyles();

    const config = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    };

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                setTournament();
            }
            if (eventData.dir === "Right") {
                setTeam();
            }
        },
        ...config,
    });

    const setTournament = () => {
        setNavBar(false);
        setTeamButtonStyle({
            backgroundColor: '#ffffff00'
        })
        setTournamentButtonStyle({
            backgroundColor: '#ffffff4d'
        })
    };

    const setTeam = () => {
        setNavBar(true);
        setTeamButtonStyle({
            backgroundColor: '#ffffff4d'
        })
        setTournamentButtonStyle({
            backgroundColor: '#ffffff00'
        })
    };

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });
    }, []);
    
    const handleInstallClick = (e) => {
        // Hide the app provided install promotion
        setInstallable(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        });
    };

    if (styles !== undefined) {
        return (
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} {...handlers} className="parametros-container menu-background font-gilroy" style={{backgroundColor: styles.background_color}}>
                
                <div className="z-depth-5 gradient-menu animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${styles.header_color} 100%)`}}> 
                    <img className="menu-header-logo white-neon" alt="Logo Team" src={icon}/>   
                </div>
                <div className="nav-bar-container animate__animated animate__fadeInDown animate__faster">
                    <Link to='time-line' className="waves-effect waves-light btn all-matches-button" ><FontAwesomeIcon className="color-text-white mr" icon={faChartLine}/>{window.innerWidth > 782? 'Linea Temporal' : ''}</Link>
                    <a onClick={ ()=>{ setTeam(); } } className="waves-effect waves-light btn nav-bar-button" style={teambuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faUserFriends}/>{window.innerWidth > 782? 'Equipos' : ''}</a>
                    <a onClick={ ()=>{ setTournament(); } } className="waves-effect waves-light btn nav-bar-button" style={tournamentbuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faTrophy}/>{window.innerWidth > 782? 'Torneos' : ''}</a>
                    <Link to='all-matches' className="waves-effect waves-light btn all-matches-button" ><FontAwesomeIcon className="color-text-white mr" icon={faFistRaised}/>{window.innerWidth > 782? 'Todos los partidos' : ''}</Link>
                </div>
                {navbar?
                    <Fragment>
                        <Search
                            setCollection={setCollection}
                            collection={collection}
                        />
                        <TeamCollection
                            collection={collection}
                        />
                        <TeamsHome/>
                    </Fragment>
                :
                    <div className="tournaments-position animate__animated animate__fadeInRight animate__faster">
                        <ListadoDeTorneos/>
                    </div>
                }
                {installable?
                    <div className="download-app-btn" onClick={()=> {handleInstallClick();}}>
                        <div style={{backgroundColor: `${styles.header_color}`}} className="btn-floating btn-large waves-effect waves-light zoom-element pulse"><FontAwesomeIcon className="color-text-black" icon={faDownload}/></div> 
                    </div>
                    :
                    null
                }
                <Footer/>   
            </div>
        );
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container menu-background" style={{backgroundColor: 'black'}}>
                <SimpleLoadScreen/>
            </div>
        );
    }
    
}
export default HomeScreen;