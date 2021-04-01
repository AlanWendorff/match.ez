import React, { useState, useEffect, useContext } from 'react';
import Team from './Team';
import SaveInLS from './SaveInLS';
import { ColorThemeContext } from '../context/ColorThemeContext';
import { PathContext } from '../context/PathContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const Search = ({setCollection, collection}) => {
    const { colors } = useContext(ColorThemeContext);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [firstpin, setFirstPin] = useState(false);
    const { paths } = useContext(PathContext);
    const pathsArray = Object.values(paths);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('collection')) === null) {
            localStorage.setItem('collection', JSON.stringify([]));
        }
        setCollection(JSON.parse(localStorage.getItem('collection')));
        //eslint-disable-next-line
    }, [paths]);

    const BuscarEquipos = () => {
        let input = document.getElementById('icon_prefix').value.toLowerCase();
        let filteredTeams = []
        pathsArray.map((equipo) => {
            if ( equipo.name.toLowerCase().startsWith(input) && input !== "") {
                filteredTeams.push(equipo);
            }
            return null;
        })
        guardarEquiposFiltrados(filteredTeams);
    }

    const SaveOnLS = () => {
        setTimeout(() => {  
            localStorage.setItem('collection', JSON.stringify(collection));
         }, 200);
    }

    return ( 
        <div className="search-container animate__animated animate__fadeInDown animate__faster" style={{backgroundColor: colors.header_color}}>
            <div title="Search team" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black" htmlFor="icon_prefix">{ `${pathsArray.length} Teams in the database:` }</label>
            </div>
            <div className="list-of-teams-container" style={{backgroundColor: colors.header_color}}>
            {
                equiposfiltrados.map(team => (
                    <Team
                        key={team.id}
                        team={team}
                        setCollection={setCollection}
                        collection={collection}
                        setFirstPin={setFirstPin}
                        
                    />
                ))
            }
            <SaveInLS
                collection={collection}
                SaveOnLS={SaveOnLS}
                firstpin={firstpin}
            />
            </div>
        </div>
     );
}

export default Search;