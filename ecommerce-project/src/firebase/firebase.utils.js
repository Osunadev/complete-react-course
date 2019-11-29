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

	const snapShot = await userRef.get();

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

// This function were made only for letting firebase to add our Shop Items to the Firestore
// once. So that we wouldn't do it manually. But we can use it to store any document in the specified collection in Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();

	objectsToAdd.forEach(obj => {
		// Firebase is creating a new CollectionReference and Generating a random Unique ID for us
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	})

	// Then when we're done with our batch writing, we're going to fire off our batch
	return await batch.commit();
}

// We'll get a collectionSnapshot and convert it to an object
export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}

	});

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {})
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
