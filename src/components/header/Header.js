import React, {useContext} from 'react';
import {HeaderLogoContext} from '../context/HeaderLogoContext';
import ProgressiveImage from 'react-progressive-image';
import csgoLogo from '../../LogoTeams/csgoLogo.png';

import './header.css';

const Header = () => { 

    let { logo, data } = useContext(HeaderLogoContext);
    
    if (logo === '') {
        logo = csgoLogo;
    }

    return ( 
        <div>
            <a href="/" title={`Click para volver a la página de inicio`}>
                <div className="z-depth-5 gradient-position cursor-pointer animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}>    
                    <ProgressiveImage src={logo} placeholder={csgoLogo}>
                        {src => <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} src={src} alt="Header Team Logo" />}
                    </ProgressiveImage>           
                </div> 
            </a>
             
            <div className="home-box">
                <a href="/" className="btn-floating btn-large waves-effect waves-light red pulse zoom-element"><i className="material-icons">home</i></a> 
            </div>
            
        </div>
    );
    
}
export default Header;