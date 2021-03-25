import React, { useState, useEffect, useContext } from 'react';
import Team from './Team';
import firebase from '../../utility/FirebaseConfig';
import LazyLoad from 'react-lazyload';
import { PathContext } from '../context/PathContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const database = firebase.database();

const Search = ({setCollection, collection}) => {

    const [equipos, guardarEquipos] = useState([]);
    const [equiposdatabase, guardarEquiposDataBase] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [savebuttonstate, setSaveButtonState] = useState({display: 'none'});
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
            const toPush = pathsArray.filter(comparer(equipos));
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
            //console.log("voy a setear en LS el equipos modificable a su vez es del local storage ");
            localStorage.setItem('teams', JSON.stringify(equiposModificable));
            //console.log("voy a setear en state el equipos modificable a su vez es del local storage ");
            guardarEquipos(equiposModificable);
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
    
    return ( 
        <div className="search-container animate__animated animate__fadeInDown animate__faster">
            <div title="Search team" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black" htmlFor="icon_prefix">{ `${equiposdatabase.length} Teams in the database:` }</label>
                <div className="save-container animate__animated animate__fadeInRight animate__faster" style={savebuttonstate} onClick={() => { 
                        localStorage.setItem('collection', JSON.stringify(collection));
                        //localStorage.removeItem('teams');
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
                        equiposdatabase={equiposdatabase}
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