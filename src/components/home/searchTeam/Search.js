import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FirebaseConfig from '../../../utility/FirebaseConfig';
import LazyLoad from 'react-lazyload';
import './search.css';

const database = FirebaseConfig();

const Search = () => {
    const [equipos, guardarEquipos] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);

    useEffect(() => {
        database.ref('paths').on('value',(snap)=>{
            const arrayEquipos = Object.values(snap.val());
            guardarEquipos(arrayEquipos);
        });
    }, []);

    const BuscarEquipos = () => {
        let input = document.getElementById('icon_prefix').value.toLowerCase();
        let filteredTeams = []
        equipos.map((equipo) => {
            if ( equipo.name.toLowerCase().startsWith(input) && input !== "") {
                filteredTeams.push(equipo);
            }
            return null;
        })
        guardarEquiposFiltrados(filteredTeams);
    }

    return ( 
        <div className="search-container animate__animated animate__backInLeft animate__faster">
            <div className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()} }>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black" htmlFor="icon_prefix">Equipo:</label>
            </div>
            <div className="list-of-teams-container">
            {
                equiposfiltrados.map(team => (
                    <Link className="searched-team" to={`/${team.path}`} title={`Ver el perfil de ${team.name}`} key={team.id}>
                        <LazyLoad offset={100} >
                            <img className="searched-team-img animate__animated animate__fadeInLeft animate__fast" alt={team.name} src={team.img}/>
                        </LazyLoad>
                        <span className="font-bold color-text-black animate__animated animate__fadeInRight animate__faster">{team.name}</span>
                    </Link> 
                ))
            }
            </div>
        </div>
     );
}

export default Search;