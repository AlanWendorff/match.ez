
export const changeCardTheme = (winner_id, teamId) =>{

    let classTeamA = "";
    let classTeamB = "";
    let classPointA = "";
    let classPointB = "";

    if (winner_id === teamId){
        classTeamA  = "match-loser outline-shade-black";
        classPointA = "match-loser point-A";
        classTeamB  = "match-winner outline-shade-black";
        classPointB = "match-winner point-B";

    }else{
        classTeamA  = "match-winner outline-shade-black";
        classPointA = "match-winner point-A";
        classTeamB  = "match-loser outline-shade-black";
        classPointB = "match-loser point-B";
    }  

    return {
        classTeamA,
        classPointA,
        classTeamB,
        classPointB
    };
    
}