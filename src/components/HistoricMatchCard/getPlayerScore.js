import axios from 'axios';
// data.headers.x-rate-limit-used
export const getPlayerScore = async (id) => {    
    const badFetch = true;           
    const url = `https://arg-matchez-backend.herokuapp.com/api/teamscore/${id}`;
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