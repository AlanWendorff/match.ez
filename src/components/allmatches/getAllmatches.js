import axios from 'axios';
// data.headers.x-rate-limit-used
export const getAllmatches = async () => {    
    const badFetch = true;    
    //https://arg-matchez-backend.herokuapp.com          
    const url = 'https://arg-matchez-backend.herokuapp.com/api/allmatches';
    try {
        const config = {
            method: 'get',
            url: url,
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        };
        const resMatches = await axios(config);
        const AllMatches = resMatches.data;
        if (resMatches.status !== 200){
            return{badFetch};
        }else{
            return{AllMatches}
        };
    } catch (error) {
        return{badFetch};  
    }
};