import React, { useState, Fragment } from 'react';
import Footer from '../footer/Footer';
import TeamsHome from './TeamsHome';
import ListadoDeTorneos from './ListadoDeTorneos';
import Search from './searchTeam/Search';
import csgoLogo from '../../LogoTeams/csgoLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './menu.css';
import './tournament.css';

const HomeScreen = () => {

    const [navbar, setNavBar] = useState(true);
    const [teambuttonstyle, setTeamButtonStyle] = useState({backgroundColor: '#ffffff4d'});
    const [tournamentbuttonstyle, setTournamentButtonStyle] = useState({backgroundColor: '#ffffff1a'});

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

    return (
        <div className="parametros-container menu-background">
            <div className="z-depth-5 gradient-menu menu-banner animate__animated animate__fadeInDown animate__faster"> 
                <img className="max-size-logo-header" alt="Logo Team" style={{filter: `drop-shadow(2px 2px 10px #ffffffb7)`}}  src={csgoLogo}/>   
            </div>
            <div className="nav-bar-container animate__animated animate__fadeInDown animate__faster">
                <a onClick={ ()=>{ setTeam(); } } className="waves-effect waves-light btn nav-bar-button" style={teambuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faUserFriends}/>Equipos</a>
                <a onClick={ ()=>{ setTournament(); } } className="waves-effect waves-light btn nav-bar-button" style={tournamentbuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faTrophy}/>Torneos</a>
            </div>

            {navbar?
                <Fragment>
                    <Search/>
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
}
//<TarjetaInformativa/>
export default HomeScreen;