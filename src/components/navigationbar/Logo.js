import React from 'react';
import './navigationbar.css';
const Logo = ({img, color}) => {

    return ( 
        <div className="loguito" style={{backgroundColor: `${color.darkMuted}`}}>
            <img src={img}/>
        </div>
     );
}
 
export default Logo;