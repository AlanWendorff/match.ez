import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorThemeContext } from '../Context/ColorThemeContext';
import SimpleLoadScreen from '../Loader/SimpleLoadScreen';
import { faBolt, faCheck, faCodeBranch, faDownload, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './more.css';
let deferredPrompt; 
const More = () => {

    const year = new Date().getFullYear();
    const { colors } = useContext(ColorThemeContext);
    const [installable, setInstallable] = useState(false);
    const [isinstalled, setIsInstalled] = useState(false);
    const [sound, setSound] = useState(true);
    useEffect(() => {

        if (JSON.parse(localStorage.getItem('sounds')) === false) {
            setSound(false);
        }
        if (window.matchMedia('(display-mode: fullscreen)').matches) {  
            setIsInstalled(true);
        }else{
            setIsInstalled(false); 
        }
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setInstallable(true);
        });
    }, []);
    
    const handleInstallClick = (e) => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            setInstallable(false);
            deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            });
        }
    };

    const turnOffSound = () => {
        localStorage.setItem('sounds', false);
        setSound(false);
    };

    const turnOnSound = () => {
        setSound(true);
        localStorage.setItem('sounds', true);
    };
    
    return ( colors.background_color !== undefined?
        <div className="options noselect" onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div onClick={()=> { handleInstallClick(); }}>
                    <FontAwesomeIcon icon={!isinstalled? faDownload : faCheck}/>
                    <span>{!isinstalled? 'Install Progresive Web App' : 'App installed successfully' }</span>
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
            <hr/>

            <div className="option animate__animated animate__fadeInRight animate__faster cursor-pointer">
                <div onClick={()=> { !sound? turnOnSound() : turnOffSound() }}>
                    <FontAwesomeIcon icon={!sound? faVolumeMute : faVolumeUp}/>
                    <span>{sound? 'Sound On' : 'Sound Off'}</span>
                </div>
            </div>
            
            <span className="animate__animated animate__fadeInUp animate__faster">All Rights Reserved. {year}</span>
        </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default More;