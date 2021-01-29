import FirebaseConfig from '../../../utility/FirebaseConfig';
const database = FirebaseConfig();

export const getStyles = () =>{
    let styles;
    database.ref('styles').on('value',(snap)=>{
        styles = snap.val();
    });
    return styles;
}