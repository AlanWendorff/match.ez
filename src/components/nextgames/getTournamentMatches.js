import axios from 'axios';
// data.headers.x-rate-limit-used
export const getTournamentMatches = async (tournamentId) => {    
    const badFetch = true;    
    //https://arg-matchez-backend.herokuapp.com          
    const url = `https://arg-matchez-backendv2.herokuapp.com/api/tournamentmatches/${tournamentId}`;
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resLiga = await axios(config);
        const matchesTournament = resLiga.data;
        if (resLiga.status !== 200){
            return{badFetch};
        }else{
            return{matchesTournament}
        };
    } catch (error) {
        return{badFetch};  
    }
};