
export const setMatchResult = (results, teamId) =>{

    let A_point = "";
    let B_point = "";

    if (results[0].team_id === teamId){
        A_point = results[1].score;
        B_point = results[0].score;
    }else{
        A_point = results[0].score;
        B_point = results[1].score;
    }  

    return {
        A_point, 
        B_point
    };
    
}