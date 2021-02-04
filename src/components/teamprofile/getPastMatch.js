const badFetch = true;
export const getPastMatch = async (proxyUrl, urlTeamId) => {       //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
    const urlPast = `https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${urlTeamId}&filter[finished]=true&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
    try {
        const resPastMatch = await fetch(urlPast);      
        if (resPastMatch.status !== 200){
            return{badFetch};  
        };
        const objPastMatch = await resPastMatch.json();
        return{objPastMatch};
        
    } catch (error) {
        return{badFetch};  
    }; 

};