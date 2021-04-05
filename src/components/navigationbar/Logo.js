import React from 'react';
import './navigationbar.css';
const Logo = ({img, color}) => {

    return ( 
        <div className="loguito" style={{backgroundColor: `${color.darkMuted}`}}>
            <img src={img} alt="team profile indicator"/>
        </div>
     );
}
 
export default Logo;