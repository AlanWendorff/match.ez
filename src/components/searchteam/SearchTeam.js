import React, { useState, useEffect, useContext } from 'react';
import Team from './Team';
import SaveInLS from './SaveInLS';
import { PathContext } from '../Context/PathContext';
import './search.css';

const SearchTeam = ({setCollection, collection}) => {
    
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [firstpin, setFirstPin] = useState(false);
    const { teams, getTeams } = useContext(PathContext);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('collection')) === null) {
            localStorage.setItem('collection', JSON.stringify([]));
        }
        setCollection(JSON.parse(localStorage.getItem('collection')));
    }, [teams]);

    const BuscarEquipos = () => {
        let input = document.getElementById('icon_prefix').value.toLowerCase();
        let filteredTeams = []
        teams.map((equipo) => {
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
         }, 100);
    }

    return ( 
        <div onClick={()=> {teams.length === 0&& getTeams();}} className={`search-container animate__fadeInDown animate__faster ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}>
            <div title="Search Team" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black" htmlFor="icon_prefix">{teams.length === 0? 'Search Teams:' : `${teams.length} Teams in the database:` }</label>
            </div>
            <div className="list-of-teams-container">
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

export default SearchTeam;