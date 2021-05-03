import axios from 'axios';
// data.headers.x-rate-limit-used
export const getRanking = async () => {    
    const badFetch = true;            
    const url = 'https://arg-matchez-backend.herokuapp.com/api/hltvranking';
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resRanking = await axios(config);
        const objRanking = resRanking.data;
        if (resRanking.status !== 200){
            return{badFetch};
        }else{
            return{objRanking}
        };
    } catch (error) {
        return{badFetch};  
    }
};