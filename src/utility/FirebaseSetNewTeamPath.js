export const setNewTeamPath = (bTeamSlug, bTeamId, bTeamName, bTeamLogo, database, paths) =>{
    //console.log(bTeamSlug, bTeamId);
    const objectToArray = Object.values(paths);
    const existingId = objectToArray.find(item => item.id === bTeamId);
    if(!existingId && bTeamId !== "" && bTeamId !== ""){
        //console.log("set PATH");
        database.ref().child('paths').push(
            {
                "id" : bTeamId,
                "path" : bTeamSlug,
                "name" : bTeamName,
                "img" : bTeamLogo
            }
        )
    }else{
        //console.log("Ya hay PATH");
        return;
    }
}