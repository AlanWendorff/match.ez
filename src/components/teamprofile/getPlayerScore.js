import axios from 'axios';
// data.headers.x-rate-limit-used
export const getPlayerScore = async (objPastMatch) => {    
    const gameId = objPastMatch[0].id;  
    const badFetch = true;    
    //https://arg-matchez-backend.herokuapp.com          
    const url = `https://arg-matchez-backend.herokuapp.com/api/teamscore/${gameId}`;
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