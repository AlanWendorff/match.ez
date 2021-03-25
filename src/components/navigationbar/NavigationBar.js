import React, {useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartLine, faDownload, faFistRaised, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {Link, useLocation} from 'react-router-dom';
import { ColorThemeContext } from '../context/ColorThemeContext';
import {
    HOME,
    TOURNAMENTS,
    MORE,
    TIMELINE,
    ALLMATCHES,
    UNITY,
    CONTROL,
  } from '../../routes/routes';
import './navigationbar.css';

const NavigationBar = () => {
    const {pathname} = useLocation();

    const { colors } = useContext(ColorThemeContext);
    return ( 
        <div className="menu-mobile" style={{backgroundColor: `${colors.header_color}`}}>
            <Link to={HOME}>
                <FontAwesomeIcon style={{color: pathname !== HOME? 'black': `${colors.background_color}`}} icon={faUserFriends}/>
            </Link>

            <Link to={TOURNAMENTS}>
                <FontAwesomeIcon style={{color: pathname !== TOURNAMENTS? 'black': `${colors.background_color}`}} icon={faTrophy}/>
            </Link>

            <Link to={TIMELINE}>
                <FontAwesomeIcon style={{color: pathname !== TIMELINE? 'black': `${colors.background_color}`}} icon={faChartLine}/>
            </Link>

            <Link to={MORE}>
                <FontAwesomeIcon style={{color: pathname !== MORE? 'black': `${colors.background_color}`}} icon={faBars}/>
            </Link>
        </div>
     );
}
 
export default NavigationBar;