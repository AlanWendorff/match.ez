import React, { useState, useEffect } from 'react';
import Team from './Team';
import FirebaseConfig from '../../../utility/FirebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const database = FirebaseConfig();

const Search = ({setCollection, collection}) => {

    const [equipos, guardarEquipos] = useState([]);
    const [equiposdatabase, guardarEquiposDataBase] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [savebuttonstate, setSaveButtonState] = useState({display: 'none'});
    
    useEffect(() => {
        if (equipos.length === 0) {
            if (localStorage.getItem('teams') === null) {
                database.ref('paths').on('value',(snap)=>{
                    const arrayEquipos = Object.values(snap.val());
                    guardarEquipos(arrayEquipos);
                    guardarEquiposDataBase(arrayEquipos);
                });
            }else{
                database.ref('paths').on('value',(snap)=>{
                    const arrayEquipos = Object.values(snap.val());
                    guardarEquiposDataBase(arrayEquipos);
                });
    
                guardarEquipos(JSON.parse(localStorage.getItem('teams')));
                setCollection(JSON.parse(localStorage.getItem('collection')));
            }
            //console.log("si loopea esta mal");
        }
        if (equiposdatabase.length > 0) {
            function comparer(otherArray){
                return function(current){
                  return otherArray.filter(function(other){
                    return other.name === current.name
                  }).length === 0;
                }
            }
            //to push or remove from localStorage
            const toPush = equiposdatabase.filter(comparer(equipos));
            const toRemove = equipos.filter(comparer(equiposdatabase));
            //const newTeamsArray = onlyInA.concat(onlyInB);
            let equiposModificable = equipos;
            if (toPush.length !== 0) {
                toPush.map((newTeam) => {
                    //console.log("voy a pushear nuevo equipo", newTeam);
                    equiposModificable.push(newTeam);
                    return equiposModificable;
                })
                guardarEquipos(equiposModificable);
            }
            if (toRemove.length !== 0) {
                toRemove.map((removeTeam) => {
                    //console.log("voy a eliminar equipo", removeTeam);    
                    const arrWithTeamRemoved = equiposModificable.filter(item => item !== removeTeam);
                    equiposModificable = arrWithTeamRemoved;
                    return equiposModificable;
                })
                guardarEquipos(equiposModificable);
            }
            localStorage.setItem('teams', JSON.stringify(equiposModificable));
        }
        //eslint-disable-next-line
    }, [equipos, equiposdatabase]);

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
            <div title="Busca tu equipo" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}} onClick={() => {window.scroll(0, 110);}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black width-50percent" htmlFor="icon_prefix">{ `${equiposdatabase.length} Equipos para buscar:` }</label>
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