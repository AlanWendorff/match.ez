
export const setGameMode = (number_of_games) =>{

    let modalidad = "";

    if (number_of_games === 1){                                     // show the BO1 BO3 BO5
        modalidad = "Mejor de 1";
    }else if(number_of_games === 3){
        modalidad = "Mejor de 3";
    }else if(number_of_games === 5){
        modalidad = "Mejor de 5";
    }
    return {
        modalidad
    };
    
}