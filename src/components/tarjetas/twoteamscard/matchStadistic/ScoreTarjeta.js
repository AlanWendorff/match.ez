import React from 'react';
import { usePalette } from 'react-palette';
import './tarjetaScore.css';

const ScoreTarjeta = ({scoreMatch, csgoLogoDefault, opponents}) => {
    const {teams} = scoreMatch; 
    let TeamLogoA;
    let TeamLogoB;
    let TeamNameA;
    let TeamNameB;
    let colorTeamA;
    let colorTeamB;
    if(teams && teams.length > 0){
        for (let i=0; i< opponents.length; i++){         
            if(scoreMatch.teams[0].name === opponents[0].opponent.name) {
                if (opponents[0].opponent.image_url === null) {
                    TeamLogoA = csgoLogoDefault;
                }else{
                    TeamLogoA = opponents[0].opponent.image_url;
                }
                if (opponents[1].opponent.image_url === null) {
                    TeamLogoB = csgoLogoDefault;
                }else{
                    TeamLogoB = opponents[1].opponent.image_url;
                }
            
                TeamNameA = opponents[0].opponent.name;
                TeamNameB = opponents[1].opponent.name;
                
                

            }else{
                if (opponents[1].opponent.image_url === null) {
                    TeamLogoA = csgoLogoDefault;
                }else{
                    TeamLogoA = opponents[1].opponent.image_url;
                }
                if (opponents[0].opponent.image_url === null) {
                    TeamLogoB = csgoLogoDefault;
                }else{
                    TeamLogoB = opponents[0].opponent.image_url;
                }

                TeamNameA = opponents[1].opponent.name;
                TeamNameB = opponents[0].opponent.name;
            }  
        };  
    };
    colorTeamA = usePalette('https://proxy-kremowy.herokuapp.com/' + TeamLogoA).data;
    colorTeamB = usePalette('https://proxy-kremowy.herokuapp.com/' + TeamLogoB).data;
    if (TeamLogoA === csgoLogoDefault) {
        colorTeamA = {
            darkVibrant: "#2d6da3"
        }
    }
    if (TeamLogoB === csgoLogoDefault) {
        TeamLogoB = {
            darkVibrant: "#2d6da3"
        }
    }

    if (teams && teams.length > 0) {
        return(
            <div>
                <div>
                    <table>
                        <thead>
                            <tr className="line-width font-gilroy" style={{backgroundColor: colorTeamA.darkVibrant}}>
                                <th className="space color-text-black">
                                    <div className="team-field">
                                        <img alt="a team" className="table-logo-size" src={TeamLogoA} />  
                                        <span className="Team-name-score">{TeamNameA}</span>
                                    </div>
                                </th>

                                <th title="Kills" className="text-to-end table-font-size text-align-center">K</th>
                                <th title="Assists / Asistencias" className="text-to-end table-font-size text-align-center">A</th>
                                <th title="Deaths / Muertes" className="text-to-end table-font-size text-align-center">D</th>
                                <th title="Headshots" className="text-to-end table-font-size text-align-center">H</th>
                                <th title="Average Damage per Round / Promedio de Daño por Ronda" className="text-to-end table-font-size text-align-center">ADR</th>
                                <th title="HLTV player rating" className="text-to-end table-font-size text-align-center">RATING</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoreMatch.teams[0].players.sort(function(a,b){return b.stats.per_game_averages.hltv_game_rating-a.stats.per_game_averages.hltv_game_rating}).map(({name, first_name, last_name, stats}, index) => {
                                    const {counts, per_game_averages} = stats;
                                    return(
                                        <tr className="line-width" key={index}>
                                            <td className="space color-text-black font-bold table-font-size">{first_name}<span style={{color: colorTeamA.darkVibrant}} className="player-name-style">"{name}"</span>{last_name}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.kills}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.assists}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.deaths}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.headshots}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{per_game_averages.adr}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{per_game_averages.hltv_game_rating}</td>
                                        </tr>
                                    );                                  
                                })
                            }
                        </tbody>
                    </table>
                </div>
            
                <div>
                    <table>
                        <thead>
                            <tr className="line-width font-gilroy" style={{backgroundColor: colorTeamB.darkVibrant}}>
                                <th className="space color-text-black">
                                    <div className="team-field">
                                        <img alt="b team" className="table-logo-size" src={TeamLogoB} />  
                                        <span className="Team-name-score">{TeamNameB}</span>
                                    </div>
                                </th>
                                <th title="Kills" className="text-to-end table-font-size text-align-center">K</th>
                                <th title="Assists / Asistencias" className="text-to-end table-font-size text-align-center">A</th>
                                <th title="Deaths / Muertes" className="text-to-end table-font-size text-align-center">D</th>
                                <th title="Headshots" className="text-to-end table-font-size text-align-center">H</th>
                                <th title="Average Damage per Round / Promedio de Daño por Ronda" className="text-to-end table-font-size text-align-center">ADR</th>
                                <th title="HLTV player rating" className="text-to-end table-font-size text-align-center">RATING</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoreMatch.teams[1].players.sort(function(a,b){return b.stats.per_game_averages.hltv_game_rating-a.stats.per_game_averages.hltv_game_rating}).map(({name, first_name, last_name, stats}, index) => {
                                    const {counts, per_game_averages} = stats;
                                    return(
                                        <tr className="line-width" key={index}>
                                            <td className="space color-text-black font-bold table-font-size">{first_name}<span style={{color: colorTeamB.darkVibrant}} className="player-name-style">"{name}"</span>{last_name}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.kills}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.assists}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.deaths}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.headshots}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{per_game_averages.adr}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{per_game_averages.hltv_game_rating}</td>
                                        </tr>
                                    );                                  
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }else{
        return(
            <p className="text-align-center cursor-default font-size label-data-style font-gilroy">
                No hay estadisticas para esta serie
            </p>  
        );
    }
}
 
export default ScoreTarjeta;