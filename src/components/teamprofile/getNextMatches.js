const badFetch = true;
export const getNextMatches = async (proxyUrl, urlTeamId) => {                                                                                     //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
    const urlUpcoming = `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[finished]=false&filter[unscheduled]=false&filter[opponent_id]=${urlTeamId}&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
    try {
        const resNextMatches = await fetch(proxyUrl + urlUpcoming);       
        if (resNextMatches.status !== 200){
            return{badFetch};
        };
        const objNextMatches = await resNextMatches.json();
        return{objNextMatches}
    } catch (error) {
        return{badFetch};    
    };      
};