
export const setGameMode = (number_of_games) =>{

    let modalidad = "";

    if (number_of_games === 1){                                     // show the BO1 BO3 BO5
        modalidad = "Best of 1";
    }else if(number_of_games === 3){
        modalidad = "Best of 3";
    }else if(number_of_games === 5){
        modalidad = "Best of 5";
    }
    return {
        modalidad
    };
    
}