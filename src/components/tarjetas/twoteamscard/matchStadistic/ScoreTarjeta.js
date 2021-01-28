import React from 'react';

import './tarjetaScore.css';

const ScoreTarjeta = ({scoreMatch, csgoLogoDefault, opponents}) => {
    const {teams} = scoreMatch; 
    let TeamLogoA;
    let TeamLogoB;
    let TeamNameA;
    let TeamNameB;

    if(teams && teams.length > 0){
        for (let i=0; i< opponents.length; i++){         
            if(opponents[0].opponent.image_url === null){
                TeamLogoA = csgoLogoDefault;
                TeamNameA = opponents[0].opponent.name;
            }else if(opponents[1].opponent.image_url === null){
                TeamLogoB = csgoLogoDefault;
                TeamNameB = opponents[1].opponent.name;
            };
            if(scoreMatch.teams[0].name === opponents[0].opponent.name) {
                TeamLogoA = opponents[0].opponent.image_url;
                TeamNameA = opponents[0].opponent.name;
                TeamLogoB = opponents[1].opponent.image_url;
                TeamNameB = opponents[1].opponent.name;
            }else{
                TeamLogoA = opponents[1].opponent.image_url;
                TeamNameA = opponents[1].opponent.name;
                TeamLogoB = opponents[0].opponent.image_url;
                TeamNameB = opponents[0].opponent.name;
            }  
        };  
    };

    if (teams && teams.length > 0) {
        return(
            <div>
                <div>
                    <table>
                        <thead>
                            <tr className="line-width">

                                <th className="space color-text-black">
                                    <div className="team-field">
                                        <img alt="a team" className="table-logo-size" src={TeamLogoA} />  
                                        <span>{TeamNameA}</span>
                                    </div>
                                </th>

                                <th className="text-to-end table-font-size text-align-center color-text-black">K.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">A.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">M.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">H.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoreMatch.teams[0].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                    const {counts} = stats;
                                    return(
                                        <tr className="line-width" key={index}>
                                            <td className="space color-text-black font-bold table-font-size">{name}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.kills}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.assists}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.deaths}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.headshots}</td>
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
                            <tr className="line-width">
                                <th className="space color-text-black">
                                    <div className="team-field">
                                        <img alt="b team" className="table-logo-size" src={TeamLogoB} />  
                                        <span>{TeamNameB}</span>
                                    </div>
                                </th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">K.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">A.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">M.</th>
                                <th className="text-to-end table-font-size text-align-center color-text-black">H.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoreMatch.teams[1].players.sort(function(a,b){return b.stats.counts.kills-a.stats.counts.kills}).map(({name, stats}, index) => {
                                    const {counts} = stats;
                                    return(
                                        <tr className="line-width" key={index}>
                                            <td className="space color-text-black font-bold table-font-size">{name}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.kills}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.assists}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.deaths}</td>
                                            <td className="text-align-center color-text-black font-bold table-font-size">{counts.headshots}</td>
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
            <p className="text-align-center cursor-default font-size label-data-style">
                No hay estadisticas para esta serie
            </p>  
        );
    }
}
 
export default ScoreTarjeta;