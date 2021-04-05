import axios from 'axios';
// data.headers.x-rate-limit-used
export const getNextMatches = async (teamId) => {    
    const badFetch = true;           
    const url = `https://arg-matchez-backend.herokuapp.com/api/nextmatches/${teamId}`;
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resMatches = await axios(config);
        const objNextMatches = resMatches.data;
        if (resMatches.status !== 200){
            return{badFetch};
        }else{
            return{objNextMatches}
        };
    } catch (error) {
        return{badFetch};  
    }
};