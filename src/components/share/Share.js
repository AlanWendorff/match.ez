import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import './share.css';

const Share = ({Facebook, Twitter, Wapp}) => {
    const [state, setState] = useState({display: 'none'});

    return ( 
        <div className="share">
            <FontAwesomeIcon onClick={()=> {
                if (state.display === 'none') {
                    setState({});
                }else{
                    setState({display: 'none'});
                }
            }} className="share-icon transition-effect zoom-element" icon={faShareAlt}/>
            <div className="social animate__animated animate__pulse animate__faster" style={state}>
                <FacebookShareButton url={`${window.location.href}`} hashtag="#csgo" quote={Facebook}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={`${window.location.href}`} title={Twitter}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton url={Wapp}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
            </div>

        </div>
        
     );
}
 
export default Share;