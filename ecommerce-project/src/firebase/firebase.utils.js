import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCwLIv6FNwQ7HbSo90UrGrJRj9_jH-Y3V0',
	authDomain: 'ecommerce-react-ac9b8.firebaseapp.com',
	databaseURL: 'https://ecommerce-react-ac9b8.firebaseio.com',
	projectId: 'ecommerce-react-ac9b8',
	storageBucket: '',
	messagingSenderId: '451464551994',
	appId: '1:451464551994:web:987a936d637ac472531f03'
};

/* THIS FUNCTION ONLY CREATES A NEW USER IF THE USER LOGGED IN DOESN'T EXIST IN THE FIRESTORE */
// userAuth obj is the one that's returned by the Google Sign In
export const createUserProfileDocument = async (userAuth, aditionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	/*  a promise is returned with a DocumentSnapshot object as a response value
      when using userRef.get() */
	const snapShot = await userRef.get();

	/* If the user doesn't exist in the Firestore, we create it */
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...aditionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(firebaseConfig);

/* We'll export this auth variable for us to use it wherever we need of authentication */
export const auth = firebase.auth();
/* We'll export this firestore variable for us to use it wherever we need to use the firestore */
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
/* This means that we want to always trigger the Google pop up whenever we use this Google Auth provider for authentication*/
provider.setCustomParameters({ prompt: 'select_account' });
/* auth.signInWithPopup can work with Facebook, LinkedIn, etc. but we're only using Google */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
