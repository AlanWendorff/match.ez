
export const changeFontEstadistica= (teamId) =>{

    let classStatsData = "font-stadistic-data "

    switch (teamId) {
        case 126709:  //9z
            classStatsData = classStatsData + 'kaster-font';
            break;

        case 125863:  //Isurus
            classStatsData = classStatsData + 'Isurus-font';
            break;

        case 127524:  //Cream
            classStatsData = classStatsData + 'Cream-font';
            break;

        case 127882:  //malvinas
            classStatsData = classStatsData + 'Malvinas-font';
            break;

        case 3260:  //sharks
            classStatsData = classStatsData + 'Sharks-font';
            break;    
    
        case 125779:  //FuriousGaming
            classStatsData = classStatsData + 'Furious-font';
            break;  

        case 127595:  //Wygers
            
            break; 

        case 127246:  //CoscuArmy
            
            break; 
            
        default:
            break;
    }
    
    return classStatsData;
}