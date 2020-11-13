
export const deleteTournamentRepeat = ({tournamentId, database}) => {

    const {tournament_1, tournament_2, tournament_3} = tournamentId;

    if(tournament_1 === tournament_2){
        let saveData = database.ref().child('tournament_slug').child('tournament_2');
        saveData.set("xxx");   
        //console.log("borro t2");
    };
    if(tournament_1 === tournament_3){
        let saveData = database.ref().child('tournament_slug').child('tournament_3');
        saveData.set("xxx");   
        //console.log("borro t3"); 
    };
}