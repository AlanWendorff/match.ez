import React from 'react';
import { Link } from 'react-router-dom';
import BannerWarning from '../../ImagenesVarias/bannerWarning.jpg';
import './warning.css';

const Warning = () => {
    return ( 
        <div className="warning posicion-tarjeta">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img alt="warning, error!" src={BannerWarning}/>
                    </div>
                    <div className="card-content separate-items">
                        <p>Algo ha ocurrido, inténtelo de nuevo más tarde o recargue la página.</p>
                        <Link to='/' className="waves-effect waves-light btn red darken-4"><i className="material-icons left">home</i>Home</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Warning;