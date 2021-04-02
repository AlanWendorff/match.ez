import csgoLogoDefaultBlack from '../Images/csgoLogoDefaultBlack.png';

export const setTeamLogo = (opponents, teamId) =>{
    let ArrteamA;
    let ArrteamB;
    let aTeamName, aTeamId, aTeamLogo;
    let bTeamName, bTeamId, bTeamLogo;
    
    console.log(teamId);
    if (teamId) {
        ArrteamA = opponents.find(element => element.opponent.id !== parseInt(teamId));
        ArrteamB = opponents.find(element => element.opponent.id === parseInt(teamId));

        if (ArrteamA.opponent.image_url === null) {
            bTeamLogo = csgoLogoDefaultBlack;
        }else{
            bTeamLogo = ArrteamA.opponent.image_url;
        }
        bTeamName = ArrteamA.opponent.name;
        bTeamId = ArrteamA.opponent.id;
    
        if (ArrteamB.opponent.image_url === null) {
            aTeamLogo = csgoLogoDefaultBlack;
        }else{
            aTeamLogo = ArrteamB.opponent.image_url;
        }
        aTeamName = ArrteamB.opponent.name;
    }else{
        aTeamName = opponents[0].opponent.name;
        aTeamId = opponents[0].opponent.id;
        bTeamName = opponents[1].opponent.name;
        bTeamId = opponents[1].opponent.id;
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
        bTeamId,
        aTeamId,
        aTeamLogo, 
        aTeamName,
        csgoLogoDefaultBlack,
    };
}