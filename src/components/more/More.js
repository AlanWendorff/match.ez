import React, { useState, Fragment, useEffect } from 'react';

const More = () => {
    
    let deferredPrompt; 
    const [installable, setInstallable] = useState(false);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setInstallable(true);
        });
    }, []);
    
    const handleInstallClick = (e) => {
        setInstallable(false);
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        });
    };

    return ( 
        <div>
            more
        </div>
     );
}
 
export default More;