import React from 'react';
import './footer.css';

const fecha = new Date().getFullYear();

const Footer = () => {

    return ( 
        <footer className="footer-container">
                <span className="footer-text">Made it with the PandaScore Free plan API (pandascore.co)</span>
                <span className="footer-text">All Rights Reserved. {fecha}</span>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/Kremowy" className="footer-text">By KremoWy</a>
        </footer>
     );
}

export default Footer;
