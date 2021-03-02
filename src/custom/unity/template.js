import Moment from 'moment';
import {momentSpanishSetup} from '../../utility/MomentSpanishSetup';

let customTournamentMatches = [];

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export const template_unity = (unity, pathsArray, unityTeams) => {
    momentSpanishSetup();
    unity.map((match) => {
        const {begin_at, team_1, team_2} = match;
        let info_team_1;
        let info_team_2;
        let path_1;
        let path_2;
        let status;
        info_team_1 = pathsArray.find(team => team.name === team_1);
        info_team_2 = pathsArray.find(team => team.name === team_2);
        if (info_team_1 === undefined) {
            info_team_1 = unityTeams.find(team => team.name === team_1);
        }
        if (info_team_2 === undefined) {
            info_team_2 = unityTeams.find(team => team.name === team_2);
        }
        if (info_team_1.path) {
            path_1 = info_team_1.path;
        }else{
            path_1 = null;
        }
        if (info_team_2.path) {
            path_2 = info_team_2.path;
        }else{
            path_2 = null;
        }
        const fullTimeUser = Moment(Date.now()).format("YYYY-MM-DD HH:mm:00");
        const dateMatch = Moment(begin_at).utc().format("YYYY-MM-DD HH:mm:00");
        let fullintPlus;
        let fullavgMatchTime;
        let firstNumberHour;
        if (parseInt(dateMatch.charAt(12)) === 9) {
            fullintPlus = 0;
            firstNumberHour = parseInt(dateMatch.charAt(11)) + 1;
            fullavgMatchTime = dateMatch.replaceAt(11, firstNumberHour.toString());
            fullavgMatchTime = fullavgMatchTime.replaceAt(12, fullintPlus.toString());
        }else{
            fullintPlus = parseInt(dateMatch.charAt(12)) + 1;
            fullavgMatchTime = dateMatch.replaceAt(12, fullintPlus.toString());
        }
        if (fullTimeUser >= dateMatch && fullTimeUser <= fullavgMatchTime) {
            status = "running";
        }else{
            status = "not_started";
        }
        if (fullTimeUser >= fullavgMatchTime) {
            status = "finished";
        };
        if (status !== "finished") {
            customTournamentMatches.push(
                {
                    "number_of_games": 1,
                    "name": `${team_1} vs ${team_2}`,
                    "begin_at": `${dateMatch}`,
                    "tournament": {
                        "name": "Temporada Regular"
                    },
                    "results": [
                        {
                            "score": "0",
                            "team_id": 128394
                        },
                        {
                            "score": "0",
                            "team_id": 126634
                        }
                    ],
                    "league": {
                        "image_url": "https://i.ibb.co/H4BqgkX/LVP-Unity-league-flow.png",
                        "name": "Unity League Flow",
                        "slug": "unity-league-flow",
                        "url": "https://unity.lvp.global/ar/calendario/"
                    },
                    "official_stream_url": "https://www.twitch.tv/lvparg2",
                    "status": `${status}`,
                    "serie": {
                        "full_name": "Temporada Regular"
                    },
                    "opponents": [
                        {
                            "opponent": {
                                "id": null,
                                "image_url": `${info_team_1.img}`,
                                "name": `${team_1}`,
                                "slug": `${path_1}`
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "id": null,
                                "image_url": `${info_team_2.img}`,
                                "name": `${team_2}`,
                                "slug": `${path_2}` 
                            },
                            "type": "Team"
                        }
                    ]
                }
            );
        }
    })
    return customTournamentMatches;
}