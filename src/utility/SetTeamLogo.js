import csgoLogoDefaultBlack from '../ImagenesVarias/csgoLogoDefaultBlack.png';

export const setTeamLogo = (opponents, teamId) =>{
    let ArrteamA;
    let ArrteamB;
    let aTeamSlug;
    let bTeamLogo;
    let aTeamLogo;
    let aTeamName;
    let bTeamName;
    let bTeamSlug;
    
    if (teamId) {
        ArrteamA = opponents.find(element => element.opponent.id !== teamId);
        ArrteamB = opponents.find(element => element.opponent.id === teamId);

        if (ArrteamA.opponent.image_url === null) {
            bTeamLogo = csgoLogoDefaultBlack;
        }else{
            bTeamLogo = ArrteamA.opponent.image_url;
        }
        bTeamName = ArrteamA.opponent.name;
        bTeamSlug = ArrteamA.opponent.slug;
    
        if (ArrteamB.opponent.image_url === null) {
            aTeamLogo = csgoLogoDefaultBlack;
        }else{
            aTeamLogo = ArrteamB.opponent.image_url;
        }
        aTeamName = ArrteamB.opponent.name;
    }else{
        aTeamName = opponents[0].opponent.name;
        aTeamSlug = opponents[0].opponent.slug;
        bTeamName = opponents[1].opponent.name;
        bTeamSlug = opponents[1].opponent.slug;
        if(opponents[0].opponent.image_url === null || undefined){
            aTeamLogo = csgoLogoDefaultBlack;
        }else{
            aTeamLogo = opponents[0].opponent.image_url;
        };
        if(opponents[1].opponent.image_url === null){
            bTeamLogo = csgoLogoDefaultBlack;
        }else{
            bTeamLogo = opponents[1].opponent.image_url;
        };
    }

    return {
        bTeamLogo, 
        bTeamName, 
        bTeamSlug,
        aTeamSlug,
        aTeamLogo, 
        aTeamName,
        csgoLogoDefaultBlack,
    };
}