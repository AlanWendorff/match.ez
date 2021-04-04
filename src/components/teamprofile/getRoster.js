import axios from 'axios';
// data.headers.x-rate-limit-used
export const getRoster = async (teamId) => {    
    const badFetch = true;            
    const url = `https://arg-matchez-backendv2.herokuapp.com/api/roster/${teamId}`;
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resRoster = await axios(config);
        const objRoster = resRoster.data;
        if (resRoster.status !== 200){
            return{badFetch};
        }else{
            return{objRoster}
        };
    } catch (error) {
        return{badFetch};  
    }
};