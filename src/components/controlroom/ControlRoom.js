import React, {useEffect, useState, useContext} from 'react';
import { TournamentContext } from '../Context/TournamentContext';
import { PathContext } from '../Context/PathContext';
import './control.css';

const Control = () => {
    const { tournamentsdatabase } = useContext(TournamentContext);
    const tournamentArray = Object.values(tournamentsdatabase);
    const { paths } = useContext(PathContext);
    const pathsArray = Object.values(paths);

    const [password, setPassword] = useState('');
    useEffect(() => {
        if (password === '123456789') {
            setPassword('pass')
        }
    }, [password]);

    const getPassword = () => {
        const input = document.getElementById('icon_prefix').value;
        setPassword(input);
    }


    return ( 
        password === 'pass'?
            <div className="secret">
                <h2 id="Teams" className="font-bold">{`TEAMS: ${pathsArray.length}`} ---- <a href="#Tournaments"> ir a torneos </a> </h2>
                {   
                    pathsArray.map((team) => {
                        return(
                            <div className="secret-item-container" key={team.id}>
                                <span className="font-size-20px cursor-pointer">Eliminar</span>
                                <span className="font-size-20px color-text-white">{team.id}</span>
                                <span className="font-size-20px color-text-white">{team.name}</span>
                                <img src={team.img} />
                            </div>
                        );                                  
                    })
                }
                <h2 id="Tournaments" className="font-bold">{`TOURNAMENTS: ${tournamentArray.length}`} ---- <a href="#Teams"> ir a teams </a></h2>
                {   
                    tournamentArray.map((tournament) => {
                        return(
                            <div className="secret-item-container" key={tournament.id}>
                                <span className="font-size-20px cursor-pointer">Eliminar</span>
                                <span className="font-size-20px color-text-white">{tournament.id}</span>
                                <span className="font-size-20px color-text-white">{tournament.name}</span>
                                <img src={tournament.image_url} />
                            </div>
                        );                                  
                    })
                }
                <div className="home-box-secret ">
                    <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                </div>
            </div>
        :
            <div className="secret">
                <div title="Busca tu equipo" className="input-field col s6 search-bar" onChange={() => {getPassword()}}>
                    <input id="icon_prefix" type="text" className="validate" autoComplete="off"></input>
                    <label className="color-text-black width-50percent" htmlFor="icon_prefix">Password</label>
                </div>

                <div className="home-box-secret ">
                    <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                </div>
            </div>
     );
}
 
export default Control;