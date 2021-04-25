import React, {useContext } from 'react';
import { faCalendarAlt, faTrophy, faUserFriends, faFistRaised } from '@fortawesome/free-solid-svg-icons';
import { HOME, TOURNAMENTS, MORE, TIMELINE, ALLMATCHES, } from '../../routes/routes';
import { ColorThemeContext } from '../Context/ColorThemeContext';
import { HeaderLogoContext } from '../Context/HeaderLogoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, useLocation} from 'react-router-dom';

import appLogo from '../../Images/defuse.png'
import csgoLogo from '../../Images/csgoLogo.png'
import './navigationbar.css';

const NavigationBar = () => {
    const {pathname} = useLocation();
    let { logo, data } = useContext(HeaderLogoContext);
    if (logo === '') logo = csgoLogo;
    
    const { colors } = useContext(ColorThemeContext);
    return ( 
        <div className="menu-mobile" style={{backgroundColor: `${colors.header_color}`}} onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>
            <Link to={HOME}>
                <FontAwesomeIcon style={{color: pathname !== HOME? 'black': `${colors.background_color}`}} icon={faUserFriends}/>
            </Link>

            <Link to={TOURNAMENTS}>
                <FontAwesomeIcon style={{color: pathname !== TOURNAMENTS? 'black': `${colors.background_color}`}} icon={faTrophy}/>
            </Link>

            <Link to={MORE} style={{zIndex: '5'}}>
                <div style={{backgroundColor: pathname !== MORE? '': `${colors.background_color}`}}>
                    <img className="nav-logo" src={appLogo} alt="app logo"/>
                </div>
            </Link>
            
            <Link to={TIMELINE}>
                <FontAwesomeIcon style={{color: pathname !== TIMELINE? 'black': `${colors.background_color}`}} icon={faCalendarAlt}/>
            </Link>

            <Link to={ALLMATCHES}>
                <FontAwesomeIcon style={{color: pathname !== ALLMATCHES? 'black': `${colors.background_color}`}} icon={faFistRaised}/>
            </Link>

        </div>
     );
}
 
export default NavigationBar;