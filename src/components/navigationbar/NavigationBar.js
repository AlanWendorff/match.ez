import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartLine, faDownload, faFistRaised, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
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
    return ( 
        <div className="menu-mobile">
            <Link to={HOME}>
                <div onClick={()=> { }}>
                    <FontAwesomeIcon className="" icon={faUserFriends}/>
                    <span>Home</span>
                </div>
            </Link>

            <Link to={TOURNAMENTS}>
                <div onClick={()=> {  }}>
                    <FontAwesomeIcon className="" icon={faTrophy}/>
                    <span>Tournaments</span>
                </div>
            </Link>

            <Link to={TOURNAMENTS}>
                <div onClick={()=> { }}>
                    <FontAwesomeIcon className="" icon={faChartLine}/>
                    <span>None</span>
                </div>
            </Link>

            <Link to={MORE}>
                <div onClick={()=> { }}>
                    <FontAwesomeIcon className="" icon={faBars}/>
                    <span>More</span>
                </div>
            </Link>
        </div>
     );
}
 
export default NavigationBar;