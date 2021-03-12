import React, { useState, useEffect, Fragment } from 'react';
import Team from './Team';
import firebase from '../../../utility/FirebaseConfig';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const database = firebase.database();

const Search = ({setCollection, collection}) => {

    const [equipos, guardarEquipos] = useState([]);
    const [equiposdatabase, guardarEquiposDataBase] = useState([]);
    const [equiposfiltrados, guardarEquiposFiltrados] = useState([]);
    const [savebuttonstate, setSaveButtonState] = useState({display: 'none'});
    
    useEffect(() => {
        if (!localStorage.getItem('teams') && !localStorage.getItem('collection')) {
            //console.log("entro a buscar al firebase");
            database.ref('paths').on('value',(snap)=>{
                const arrayEquipos = Object.values(snap.val());
                guardarEquipos(arrayEquipos);
                guardarEquiposDataBase(arrayEquipos);
            });
        }else{
            //console.log("entro a buscar al local");
            database.ref('paths').on('value',(snap)=>{
                const arrayEquipos = Object.values(snap.val());
                guardarEquiposDataBase(arrayEquipos);
                const equipos = JSON.parse(localStorage.getItem('teams'));

                function comparer(otherArray){
                    return function(current){
                        return otherArray.filter(function(other){
                        return other.name === current.name
                        }).length === 0;
                    }
                }
                //to push or remove from localStorage
                const toPush = arrayEquipos.filter(comparer(equipos));
                const toRemove = equipos.filter(comparer(arrayEquipos));
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
            });
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
            <div title="Busca tu equipo" className="input-field col s6 search-bar" onChange={() => {BuscarEquipos()}} onClick={() => {window.scroll(0, 100);}}>
                <i className="material-icons prefix">people_outline</i>
                <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                <label className="color-text-black width-100percent" htmlFor="icon_prefix">{ `${equiposdatabase.length} Equipos para buscar:` }</label>
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
                    <LazyLoad offset={100} height={100} once>
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
                    </LazyLoad>
                ))
            }
            </div>
        </div>
     );
}

export default Search;