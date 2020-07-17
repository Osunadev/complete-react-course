import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCwLIv6FNwQ7HbSo90UrGrJRj9_jH-Y3V0',
  authDomain: 'ecommerce-react-ac9b8.firebaseapp.com',
  databaseURL: 'https://ecommerce-react-ac9b8.firebaseio.com',
  projectId: 'ecommerce-react-ac9b8',
  storageBucket: '',
  messagingSenderId: '451464551994',
  appId: '1:451464551994:web:987a936d637ac472531f03',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
