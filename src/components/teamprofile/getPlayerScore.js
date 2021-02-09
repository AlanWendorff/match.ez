const badFetch = true;
export const getPlayerScore = async (proxyUrl, objPastMatch) => { 
    const prevmatchID = objPastMatch[0].id;   
    
    //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
    const urlPlayerScore = `https://api.pandascore.co/csgo/matches/${prevmatchID}/players/stats?token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
    try { 
        const resPlayerScore = await fetch(proxyUrl + urlPlayerScore);      
        if (resPlayerScore.status !== 200){
            return{badFetch};
        };
        const objPlayerScore = await resPlayerScore.json();
        return{objPlayerScore}
    } catch (error) {
        return{badFetch};   
    };      
};