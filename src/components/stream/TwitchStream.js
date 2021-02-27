import React from 'react';
import './stream.css';

const TwitchStream = () => {
    return ( 
        <div className="twitch-container">
            <iframe src="https://embed.twitch.tv?autoplay=true&amp;channel=esl_csgo&amp;height=940&amp;migration=true&amp;muted=false&amp;parent=argmatchez.web.app&amp;referrer=https://argmatchez.web.app/&amp;targetId=twitch-embed&amp;width=480" 
                allowfullscreen="true" 
                scrolling="no" 
                frameborder="0" 
                allow="autoplay; fullscreen" 
                title="Twitch" 
                sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" 
                width="1280" height="720"
            >
            </iframe>
        </div> 
    );
}
 
export default TwitchStream;