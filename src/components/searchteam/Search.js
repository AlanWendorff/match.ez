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
    const [equipos, guardarEquipos] = useState([]);
    const [equiposdatabase, guardarEquiposDataBase] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [firstpin, setFirstPin] = useState(false);
    const { paths } = useContext(PathContext);
    const pathsArray = Object.values(paths);

    useEffect(() => {
        if (!localStorage.getItem('teams') && !localStorage.getItem('collection')) {
            //console.log("entro a buscar al firebase");
            guardarEquipos(pathsArray);
            guardarEquiposDataBase(pathsArray);

        }else{
            //console.log("entro a buscar al local");
            guardarEquiposDataBase(pathsArray);
            const equipos = JSON.parse(localStorage.getItem('teams'));

            function comparer(otherArray){
                return function(current){
                    return otherArray.filter(function(other){
                    return other.name === current.name
                    }).length === 0;
                }
            }
            //to push or remove from localStorage
            if (pathsArray.length > 0) {
                const toPush = pathsArray.filter(comparer(equipos));
                //console.log('pathsArray (database lenght)',pathsArray.length);
                const toRemove = equipos.filter(comparer(pathsArray));
                let equiposModificable = equipos;
                //console.log({toRemove, toPush});
                if (toPush.length !== 0) {
                    toPush.map((newTeam) => {
                        //console.log("voy a pushear nuevo equipo", newTeam);
                        equiposModificable.push(newTeam);
                        return equiposModificable;
                    })
                }
                if (toRemove.length !== 0) {
                    toRemove.map((removeTeam) => {
                        //console.log("voy a eliminar equipo", removeTeam);    
                        const arrWithTeamRemoved = equiposModificable.filter(item => item !== removeTeam);
                        equiposModificable = arrWithTeamRemoved;
                        return equiposModificable;
                    })
                }
                //console.log(equiposModificable);
                //console.log("voy a setear en LS el equipos modificable a su vez es del local storage ");
                localStorage.setItem('teams', JSON.stringify(equiposModificable));
                //console.log("voy a setear en state el equipos modificable a su vez es del local storage ");
                guardarEquipos(equiposModificable);
            }
            setCollection(JSON.parse(localStorage.getItem('collection')));
        }
        //eslint-disable-next-line
    }, [paths]);

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

    const SaveOnLS = () => {
        setTimeout(() => {  
            console.log("guardo en LS");
            localStorage.setItem('collection', JSON.stringify(collection));
            localStorage.removeItem('teams');
            localStorage.setItem('teams', JSON.stringify(equipos));
         }, 200);
    }

    return ( 
        <div className="search-container animate__animated animate__fadeInDown animate__faster" style={{backgroundColor: colors.header_color}}>
            <div title="Search team" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black" htmlFor="icon_prefix">{ `${equiposdatabase.length} Teams in the database:` }</label>
            </div>
            <div className="list-of-teams-container" style={{backgroundColor: colors.header_color}}>
            {
                equiposfiltrados.map(team => (
                    <Team
                        key={team.id}
                        equiposdatabase={equiposdatabase}
                        team={team}
                        setCollection={setCollection}
                        guardarEquipos={guardarEquipos}
                        equipos={equipos}
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