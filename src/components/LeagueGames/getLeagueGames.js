import axios from 'axios';
// data.headers.x-rate-limit-used
export const getLeagueGames = async (tournamentId) => {    
    const badFetch = true;    
    //https://arg-matchez-backend.herokuapp.com          
    const url = `https://arg-matchez-backend.herokuapp.com/api/tournamentmatches/${tournamentId}`;
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resLiga = await axios(config);
        const leagueGames = resLiga.data;
        if (resLiga.status !== 200){
            return{badFetch};
        }else{
            return{leagueGames}
        };
    } catch (error) {
        return{badFetch};  
    }
};