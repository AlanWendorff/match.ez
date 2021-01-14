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
    const [savebuttonstate, setSaveButtonState] = useState({display: 'none'});
    
    useEffect(() => {
        if (localStorage.getItem('teams') === null) {
            database.ref('paths').on('value',(snap)=>{
                const arrayEquipos = Object.values(snap.val());
                guardarEquipos(arrayEquipos);
            });
        }else{
            guardarEquipos(JSON.parse(localStorage.getItem('teams')));
            setCollection(JSON.parse(localStorage.getItem('collection')));
        }
        //eslint-disable-next-line
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
                <label className="color-text-black width-50percent" htmlFor="icon_prefix">Equipo:</label>
                <div className="save-container animate__animated animate__fadeInRight animate__faster" style={savebuttonstate} onClick={() => { 
                        localStorage.setItem('collection', JSON.stringify(collection));
                        localStorage.setItem('teams', JSON.stringify(equipos));
                        }}> 
                    <FontAwesomeIcon icon={faSave}/>
                </div>  
            </div>
            <div className="list-of-teams-container">
            {
                equiposfiltrados.map(team => (
                    <Team
                        key={team.id}
                        team={team}
                        setCollection={setCollection}
                        guardarEquipos={guardarEquipos}
                        equipos={equipos}
                        collection={collection}
                        setSaveButtonState={setSaveButtonState}
                    />
                ))
            }
            </div>
        </div>
     );
}

export default Search;