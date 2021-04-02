import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faHistory } from '@fortawesome/free-solid-svg-icons';
import './headermobile.css';

const HeaderMobile = ({color, setShow, isTournament}) => {

    const [buttonstatus, setButtonStatus] = useState(
        {
            vs: true,
            history: false,
            ladder: false
        }
    );

    const setHistory = () => {
        setButtonStatus({
            vs: false,
            history: true,
            ladder: false
        })
        setShow("history");
    }
    const setLadder = () => {
        setButtonStatus({
            vs: false,
            history: false,
            ladder: true
        })
        setShow("ladder");
    }
    const setVs = () => {
        setButtonStatus({
            vs: true,
            history: false,
            ladder: false
        })
        setShow("vs");
    }
    return ( 
        <div className="header-mobile" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${color.vibrant} 100%)`}}>
            <div className="waves-effect" onClick={()=> {setVs();}}      style={{backgroundColor: buttonstatus.vs === true ? '#ffffff4d' : ''}} >VS</div>
            <div className="waves-effect" onClick={()=> {setHistory();}} style={{backgroundColor: buttonstatus.history === true ? '#ffffff4d' : ''}} ><FontAwesomeIcon icon={faHistory}/></div>
            {isTournament&&
                <div className="waves-effect" onClick={()=> {setLadder();}}  style={{backgroundColor: buttonstatus.ladder === true ? '#ffffff4d' : ''}} ><FontAwesomeIcon icon={faFire}/></div>
            }
        </div>
     );
}
 
export default HeaderMobile;