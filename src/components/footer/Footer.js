import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const fecha = new Date().getFullYear();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 5) {
            setCount(1000);
        }
    }, [count]);

    return ( 
        <footer className="footer-container">
                {count >= 1000?
                    <Redirect to="/control-room"/> 
                :
                    null
                }
                <span className="footer-text" onClick={()=>{ setCount(count+1); }}>Made it with the PandaScore Free plan API (pandascore.co)</span>
                <span className="footer-text">All Rights Reserved. {fecha}</span>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/Kremowy" className="footer-text">By KremoWy</a>
        </footer>
     );
}

export default Footer;
