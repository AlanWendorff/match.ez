import axios from 'axios';
// data.headers.x-rate-limit-used
export const getPastMatch = async (teamId) => {    
    const badFetch = true;          
    const url = `https://arg-matchez-backend.herokuapp.com/api/prevmatches/${teamId}`;
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resPrevMatches = await axios(config);
        const objPastMatch = resPrevMatches.data;
        if (resPrevMatches.status !== 200){
            return{badFetch};
        }else{
            return{objPastMatch}
        };
    } catch (error) {
        return{badFetch};  
    }
};