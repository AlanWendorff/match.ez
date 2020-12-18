import csgoLogoDefault from '../ImagenesVarias/csgoLogoDefault.png';

export const setTeamLogo = (opponents, teamId) =>{

    let opponentLogo = "";
    let opponentName = "";
    let ownName = "";
    let ownLogo = "";
    let opponentSlug = "";

    for (let i=0; i< opponents.length; i++){                        // get always the opponent team logo (pandascore object index of opponent logo team are irregular)
        if (opponents[i].opponent.id !== teamId){
            if(opponents[i].opponent.image_url === null){
                opponentLogo = csgoLogoDefault;
            }else{
                opponentLogo = opponents[i].opponent.image_url;
            }   
            opponentName = opponents[i].opponent.name;
            opponentSlug = opponents[i].opponent.slug
        }else{
            ownLogo = opponents[i].opponent.image_url;
            ownName = opponents[i].opponent.name;
            
        }
    };   

    return {
        opponentLogo, 
        opponentName, 
        ownLogo, 
        ownName,
        opponentSlug
    };
}