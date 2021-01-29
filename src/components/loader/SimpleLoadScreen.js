import React from 'react';
import webLogo from '../../ImagenesVarias/Icon.png';
import './loader.css';

const SimpleLoadScreen = () => {
    return (
        <div className="simple-loader-container">
            <div className="preloader-wrapper active simple-spinner-loader">
                <div className="spinner-layer spinner-color">
                    <div className="circle-clipper left">
                        <div className="circle simple-spinner-width"></div>
                    </div><div className="gap-patch">
                        <div className="circle simple-spinner-width"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle simple-spinner-width"></div>
                    </div>
                </div>
            </div>    
            <img className="web-logo animate__animated animate__flip animate__infinite animate__slow noselect" alt="web main logo" src={webLogo}/>
        </div>
     );
}
 
export default SimpleLoadScreen;