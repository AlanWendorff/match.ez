import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorThemeContext } from '../Context/ColorThemeContext';
import { Link } from "react-router-dom";
import SimpleLoadScreen from '../Loader/SimpleLoadScreen';
import { faBolt, faCheck, faCodeBranch, faDownload, faFilm, faNewspaper, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { NEWS } from "../../routes/routes";
import './more.css';
const More = ({handleInstallClick, isinstalled, setIsInstalled}) => {
    
    const year = new Date().getFullYear();
    const { colors } = useContext(ColorThemeContext);
    
    const [sound, setSound] = useState(true);
    const [anim, setAnim] = useState(true);
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('sounds')) === false) {
            setSound(false);
        }
        if (window.matchMedia('(display-mode: standalone)').matches) {  
            setIsInstalled(true);
        }else{
            setIsInstalled(false); 
        }
    }, []);
    
    const turnOffSound = () => {
        localStorage.setItem('sounds', false);
        setSound(false);
    };

    const turnOnSound = () => {
        setSound(true);
        localStorage.setItem('sounds', true);
    };

    const turnOffAnim = () => {
        localStorage.setItem('animations', false);
        setAnim(false);
    };

    const turnOnAnim = () => {
        setAnim(true);
        localStorage.setItem('animations', true);
    };
    
    return ( colors.background_color !== undefined?
        <div className="options noselect" onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>

            <Link to={NEWS} className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div>
                    <FontAwesomeIcon icon={faNewspaper}/>
                    <span>News</span>
                </div>
            </Link>
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div onClick={()=> { handleInstallClick(); }}>
                    <FontAwesomeIcon icon={!isinstalled? faDownload : faCheck}/>
                    <span>{!isinstalled? 'Install Progresive Web App' : 'App installed successfully' }</span>
                </div>
            </div>
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div onClick={()=> { !sound? turnOnSound() : turnOffSound() }}>
                    <FontAwesomeIcon icon={!sound? faVolumeMute : faVolumeUp}/>
                    <span>{sound? 'Sound On' : 'Sound Off'}</span>
                </div>
            </div>
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div onClick={()=> { !anim? turnOnAnim() : turnOffAnim() }}>
                    <div className="line"></div>
                    <FontAwesomeIcon className={anim? "move" : ""} icon={faFilm}/>
                    <span>{anim? 'Animations On' : 'Animations Off'}</span>
                </div>
            </div>
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/Kremowy">
                    <FontAwesomeIcon icon={faCodeBranch}/>
                    <span>Creator Github</span>
                </a>
            </div>
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <a rel="noopener noreferrer" target="_blank" href="https://pandascore.co/">
                    <FontAwesomeIcon icon={faBolt}/>
                    <span>Powered by PandaScore.co</span>
                </a>
            </div>
            
            <span className="animate__animated animate__fadeInUp animate__faster">All Rights Reserved. {year}</span>
        </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default More;