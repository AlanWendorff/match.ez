import React, { useState, Fragment, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";
import Footer from '../footer/Footer';
import TeamsHome from './TeamsHome';
import TeamCollection from '../teamcollection/TeamCollection';
import ListadoDeTorneos from './ListadoDeTorneos';
import Search from './searchTeam/Search';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import icon from '../../ImagenesVarias/Icon.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDownload, faFistRaised, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { getStyles } from '../../utility/FirebaseStyles';
import './menu.css';
import './tournament.css';


const HomeScreen = () => {

    if (styles !== undefined) {
        return (
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} {...handlers} className="parametros-container menu-background font-gilroy" style={{backgroundColor: styles.background_color}}>
                
                <div className="z-depth-5 gradient-menu animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${styles.header_color} 100%)`}}> 
                    <img className="menu-header-logo white-neon" alt="Logo Team" src={icon}/>   
                </div>
                <div className="nav-bar-container animate__animated animate__fadeInDown animate__faster">
                    <Link to='time-line' className="waves-effect waves-light btn all-matches-button" ><FontAwesomeIcon className="color-text-white mr" icon={faChartLine}/>{window.innerWidth > 782? 'TOURNAMENT TIMELINE' : ''}</Link>
                    <a onClick={ ()=>{ setTeam(); } } className="waves-effect waves-light btn nav-bar-button" style={teambuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faUserFriends}/>{window.innerWidth > 782? 'Teams' : ''}</a>
                    <a onClick={ ()=>{ setTournament(); } } className="waves-effect waves-light btn nav-bar-button" style={tournamentbuttonstyle} href="/#"><FontAwesomeIcon className="color-text-white mr" icon={faTrophy}/>{window.innerWidth > 782? 'Tournaments' : ''}</a>
                    <Link to='all-matches' className="waves-effect waves-light btn all-matches-button" ><FontAwesomeIcon className="color-text-white mr" icon={faFistRaised}/>{window.innerWidth > 782? 'All matches' : ''}</Link>
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