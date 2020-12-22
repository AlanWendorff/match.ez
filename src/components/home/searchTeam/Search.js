import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FirebaseConfig from '../../../utility/FirebaseConfig';

import './search.css';

const database = FirebaseConfig();

const Search = () => {
    const [equipos, guardarEquipos] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);

    useEffect(() => {
        database.ref('paths').on('value',(snap)=>{
            const arrayEquipos = Object.values(snap.val());
            console.log(arrayEquipos);
            guardarEquipos(arrayEquipos);
        });
    }, []);

    const BuscarEquipos = () => {
        let filtered = equipos.filter(team => team.path === 'astralis');
        guardarEquiposFiltrados(filtered);
    }


    return ( 
        <div className="search-container">
            <div className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()} }>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate"></input>
                <label className="color-text-black" htmlFor="icon_prefix">Equipo:</label>
            </div>
            <div className="list-of-teams-container">
            {
                equiposfiltrados.map(team => (
                    <Link className="searched-team" to={`/${team.path}`} title={`Ver el perfil de ${team.path}`} key={team.id}>
                        <span>{team.path}</span>
                    </Link> 
                ))
            }
            </div>
        </div>
     );
}
//<img className="searched-team-img" src={team.img}/>
export default Search;