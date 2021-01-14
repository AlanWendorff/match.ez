import React, { useState, useEffect } from 'react';
import Team from './Team';
import FirebaseConfig from '../../../utility/FirebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const database = FirebaseConfig();

const Search = ({setCollection, collection}) => {

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
                    <Team
                        team={team}
                        setCollection={setCollection}
                        collection={collection}
                    />
                ))
            }
            </div>
        </div>
     );
}

export default Search;