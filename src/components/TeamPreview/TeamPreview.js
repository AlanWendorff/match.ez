import React from 'react';

import './teampreview.css';

const TeamPreview = ({color, matches, prevMatch}) => {
    const NEXTMATCH = matches[0];
    const LASTMATCH = prevMatch[0];

    const array = [
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Maximiliano",
            "hometown": null,
            "id": 28854,
            "image_url": "https://cdn.pandascore.co/images/player/image/28854/600px_max_dh_dallas_19.png",
            "last_name": "Gonzalez",
            "name": "max",
            "nationality": "UY",
            "role": null,
            "slug": "maxujas-maximiliano-gonzalez"
        },
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Martin",
            "hometown": null,
            "id": 27555,
            "image_url": null,
            "last_name": "Molina",
            "name": "rox",
            "nationality": "AR",
            "role": null,
            "slug": "rox"
        },
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Santino",
            "hometown": "Argentina",
            "id": 25439,
            "image_url": "https://cdn.pandascore.co/images/player/image/25439/try_liga_pro.png",
            "last_name": "Rigal",
            "name": "try",
            "nationality": "AR",
            "role": null,
            "slug": "try-482d2f57-1655-4044-bda0-08f3af13b833"
        },
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Franco",
            "hometown": "Argentina",
            "id": 25430,
            "image_url": "https://cdn.pandascore.co/images/player/image/25430/mvg_fran__ssj.png",
            "last_name": "Garcia",
            "name": "knarf",
            "nationality": "UY",
            "role": null,
            "slug": "knarf"
        },
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Ignacio",
            "hometown": "Argentina",
            "id": 21430,
            "image_url": "https://cdn.pandascore.co/images/player/image/21430/900px_meyern_dh_open_anaheim_2020.png",
            "last_name": "Meyer",
            "name": "meyern",
            "nationality": "AR",
            "role": null,
            "slug": "meyern"
        },
        {
            "current_team": {
                "acronym": null,
                "id": 126709,
                "image_url": "https://cdn.pandascore.co/images/team/image/126709/9996.png",
                "location": null,
                "modified_at": "2021-03-26T08:15:59Z",
                "name": "9z",
                "slug": "9z"
            },
            "current_videogame": {
                "id": 3,
                "name": "CS:GO",
                "slug": "cs-go"
            },
            "first_name": "Bruno",
            "hometown": "Brazil",
            "id": 18184,
            "image_url": "https://cdn.pandascore.co/images/player/image/18184/bit.png",
            "last_name": "Lima",
            "name": "bit",
            "nationality": "BR",
            "role": null,
            "slug": "bit"
        }
    ]
    
    return ( 
        <div className="preview-container">
            <table>
                <tbody>
                    {
                        array.map(player => {
                            const {nationality, name, first_name, last_name, image_url} = player;
                            return(
                                <tr className="line-width" >
                                    <td className="text-align-center color-text-black font-bold table-font-size"><img src={image_url} /></td>
                                    <td className="space color-text-black font-bold table-font-size">{first_name}<span style={{color: color.darkVibrant}} className="player-name-style">"{name}"</span>{last_name}</td>
                                    <td className="text-align-center color-text-black font-bold table-font-size">{nationality}</td>
                                </tr>
                            );                                  
                        })
                    }
                </tbody>
            </table>

            
        </div>
     );
}
 
export default TeamPreview;
