const badFetch = true;
export const getTournamentMatches = async (proxyUrl, tournamentId) => {       //          --- FREE PLAN TOKEN register on pandascore.co and get your free token ---                      
    const urlLiga  = `https://api.pandascore.co/csgo/matches?filter[league_id]=${tournamentId}&sort=begin_at&filter[status]=not_started,running&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`;
    try {
        const resLiga = await fetch(proxyUrl + urlLiga);        
        if (resLiga.status !== 200){
            return{badFetch};  
        };
        const objLiga = await resLiga.json();
        return{objLiga};
        
    } catch (error) {
        return{badFetch};  
    }; 

};