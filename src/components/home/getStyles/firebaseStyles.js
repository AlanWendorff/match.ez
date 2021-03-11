import firebase from '../../../utility/FirebaseConfig';
const database = firebase.database();

export const getStyles = () =>{
    let styles;
    database.ref('styles').on('value',(snap)=>{
        styles = snap.val();
    });
    return styles;
}