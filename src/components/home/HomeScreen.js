import React from 'react';
import Footer from '../footer/Footer';
import TeamsHome from './TeamsHome';
import ListadoDeTorneos from './ListadoDeTorneos';
import Search from './searchTeam/Search';
import csgoLogo from '../../LogoTeams/csgoLogo.png';
import './menu.css';
import './tournament.css';

const HomeScreen = () => {
    const backStyle = {
        backgroundColor: '#7b0480'
    };

    return (
        <div className="parametros-container menu-background" style={backStyle}>
            <div className="z-depth-5 gradient-menu menu-banner"> 
                <img className="max-size-logo-header" alt="Logo Team" style={{filter: `drop-shadow(2px 2px 10px #ffffffb7)`}}  src={csgoLogo}/>   
            </div>
            <div className="tournaments-position">
                <ListadoDeTorneos/>
            </div>
            <Search/>
            <TeamsHome/>
            <Footer/>   
        </div>
    );
}
//<TarjetaInformativa/>
export default HomeScreen;