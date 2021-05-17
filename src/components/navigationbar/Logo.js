import React from 'react';
import './navigationbar.css';
const Logo = ({img, color}) => {

    return ( 
        <div className="loguito-container">
            <div className="loguito" style={{backgroundColor: `${color.DarkMuted}`}}>
                <img src={img} alt="team profile indicator"/>
            </div>
        </div>
     );
}
 
export default Logo;