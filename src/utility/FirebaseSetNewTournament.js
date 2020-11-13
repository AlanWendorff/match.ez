export const setNewTournament = (league, tournamentId, database) =>{
    const {id, image_url, name} = league;
    const objectToArray = Object.values(tournamentId);
    const existingId = objectToArray.find(item => item.id === id);
    if(!existingId){
        //console.log("set tournament");
        database.ref().child('tournament').push(
            {
                "id" : id,
                "image_url" : image_url,
                "name" : name
            }
        )
    }else{
        //console.log("no hay tournament");
        return;
    }
}