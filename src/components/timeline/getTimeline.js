import axios from 'axios';
// data.headers.x-rate-limit-used
export const getTimeline = async () => {    
    const badFetch = true;            
    const url = 'https://arg-matchez-backend.herokuapp.com/api/timeline';
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resTime = await axios(config);
        const objTime = resTime.data;
        if (resTime.status !== 200){
            return{badFetch};
        }else{
            return{objTime}
        };
    } catch (error) {
        return{badFetch};  
    }
};