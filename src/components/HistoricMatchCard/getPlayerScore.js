import axios from 'axios';
import { PLAYER_SCORE } from "../../const/ApiEndpoints";

export const getPlayerScore = async (id) => {    
    const badFetch = true;           
    const url = PLAYER_SCORE.replace(':id', id);
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const gameScore = await axios(config);
        const objPlayerScore = gameScore.data;
        if (gameScore.status !== 200){
            return{badFetch};
        }else{
            return{objPlayerScore}
        };
    } catch (error) {
        return{badFetch};  
    }
};