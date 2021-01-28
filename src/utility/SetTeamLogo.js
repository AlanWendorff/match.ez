import csgoLogoDefault from '../ImagenesVarias/csgoLogoDefault.png';

export const setTeamLogo = (opponents, teamId) =>{

    const ArrteamA = opponents.find(element => element.opponent.id !== teamId);
    const ArrteamB = opponents.find(element => element.opponent.id === teamId);

    let opponentLogo;
    let ownLogo;
    
    if (ArrteamA.opponent.image_url === null) {
        opponentLogo = csgoLogoDefault;
    }else{
        opponentLogo = ArrteamA.opponent.image_url;
    }
    const opponentName = ArrteamA.opponent.name;
    const opponentSlug = ArrteamA.opponent.slug;

    if (ArrteamB.opponent.image_url === null) {
        ownLogo = csgoLogoDefault;
    }else{
        ownLogo = ArrteamB.opponent.image_url;
    }
    const ownName = ArrteamB.opponent.name;

    return {
        opponentLogo, 
        opponentName, 
        opponentSlug,
        ownLogo, 
        ownName,
        csgoLogoDefault
    };
}