import React, { useState, Fragment } from 'react';
import Footer from '../footer/Footer';
import TeamsHome from './TeamsHome';
import TeamCollection from './teamdirectacces/TeamCollection';
import ListadoDeTorneos from './ListadoDeTorneos';
import Search from './searchTeam/Search';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import icon from '../../ImagenesVarias/Icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { getStyles } from './getStyles/firebaseStyles';
import './menu.css';
import './tournament.css';
const HomeScreen = () => {

    const [navbar, setNavBar] = useState(true);
    const [teambuttonstyle, setTeamButtonStyle] = useState({backgroundColor: '#ffffff4d'});
    const [tournamentbuttonstyle, setTournamentButtonStyle] = useState({backgroundColor: '#ffffff1a'});
    const [collection, setCollection] = useState([]);
    const styles = getStyles();

    const setTournament = () => {
        setNavBar(false);
        setTeamButtonStyle({
            backgroundColor: '#ffffff1a'
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
            backgroundColor: '#ffffff1a'
        })
    };
    if (styles !== undefined) {
        return (
            <div className="parametros-container menu-background font-gilroy" style={{backgroundColor: styles.background_color}}>
                <div className="z-depth-5 gradient-menu animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${styles.header_color} 100%)`}}> 
                    <img className="max-size-logo-header white-neon" alt="Logo Team" src={icon}/>   
                </div>
                <div className="nav-bar-container animate__animated animate__fadeInDown animate__faster">
                    <a onClick={ ()=>{ setTeam(); } } className="waves-effect waves-light btn nav-bar-button" style={teambuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faUserFriends}/>Equipos</a>
                    <a onClick={ ()=>{ setTournament(); } } className="waves-effect waves-light btn nav-bar-button" style={tournamentbuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faTrophy}/>Torneos</a>
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
                    <div className="tournaments-position animate__animated animate__backInRight animate__faster">
                        <ListadoDeTorneos/>
                    </div>
                }
                <Footer/>   
            </div>
        );
    }else{
        return(
            <div className="parametros-container menu-background" style={{backgroundColor: 'black'}}>
                <SimpleLoadScreen/>
            </div>
        );
    }
    
}
export default HomeScreen;