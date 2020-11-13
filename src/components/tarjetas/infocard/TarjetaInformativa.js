import React from 'react';
//import InstagramEmbed from 'react-instagram-embed';
//import FirebaseConfig from '../../../utility/FirebaseConfig';

import './tarjetaInfo.css';

//const database = FirebaseConfig();

const TarjetaInformativa = ({noMatches}) => {
    /*
    const [link, guardarLink] = useState([]);
    let mensaje = "";

    useEffect(() => {  
        database.ref('links').on('value',(snap)=>{
            guardarLink(snap.val());
        });
    },[]);

    const {instagramLink} = link;

    if (noMatches === true){
        mensaje = "No se encuentran partidos próximos.";
    }else{
        mensaje = "Noticias de la escena";
    };

    */
    return ( 
        <div className="container-tarjeta-instagram posicion-tarjeta">
            <p className="NO-matches cursor-default">No se encuentran partidos próximos.</p> 
        </div>
    );   
}


/*
if (instagramLink) {
        return ( 
            <div className="container-tarjeta-instagram posicion-tarjeta">
                <p className="NO-matches cursor-default">No se encuentran partidos próximos.</p> 
            </div>
            <div className="info-card">
                    <InstagramEmbed
                        url={instagramLink}
                        maxWidth={600}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                    />
                </div>
        );   
    }else{
        return(<div></div>);
    }    
*/

export default TarjetaInformativa;