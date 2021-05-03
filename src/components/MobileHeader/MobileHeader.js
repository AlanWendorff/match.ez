import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faHistory } from '@fortawesome/free-solid-svg-icons';
import './headermobile.css';

const HeaderMobile = ({color, buttonstatus, img, setVs, setHistory, setPreview, isProfile, isTournament, setLadder}) => (
    <div className="header-mobile" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${color.vibrant} 100%)`}}>
        {isProfile&&
            <div className="waves-effect" onClick={()=> {setPreview();}} style={{backgroundColor: buttonstatus.preview === true ? '#ffffff4d' : ''}} >
                <img src={img} />
            </div>
        }
        <div className="waves-effect" onClick={()=> {setVs();}}      style={{backgroundColor: buttonstatus.vs === true ? '#ffffff4d' : ''}} >VS</div>
        <div className="waves-effect" onClick={()=> {setHistory();}} style={{backgroundColor: buttonstatus.history === true ? '#ffffff4d' : ''}} ><FontAwesomeIcon icon={faHistory}/></div>
        {isTournament&&
            <div className="waves-effect" onClick={()=> {setLadder();}}  style={{backgroundColor: buttonstatus.ladder === true ? '#ffffff4d' : ''}} ><FontAwesomeIcon icon={faFire}/></div>
        }
    </div>
);
 
export default HeaderMobile;