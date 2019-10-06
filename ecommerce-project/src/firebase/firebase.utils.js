import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCwLIv6FNwQ7HbSo90UrGrJRj9_jH-Y3V0",
    authDomain: "ecommerce-react-ac9b8.firebaseapp.com",
    databaseURL: "https://ecommerce-react-ac9b8.firebaseio.com",
    projectId: "ecommerce-react-ac9b8",
    storageBucket: "",
    messagingSenderId: "451464551994",
    appId: "1:451464551994:web:987a936d637ac472531f03"
};

firebase.initializeApp(firebaseConfig);

/* We'll export this auth variable for us to use it wherever we need of authentication */
export const auth = firebase.auth();
/* We'll export this firestore variable for us to use it wherever we need to use the firestore */
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
/* This means that we want to always trigger the Google pop up whenever we use this Google Auth provider for authentication*/
provider.setCustomParameters({ prompt: 'select_account' })
/* auth.signInWithPopup can work with Facebook, LinkedIn, etc. but we're only using Google */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;