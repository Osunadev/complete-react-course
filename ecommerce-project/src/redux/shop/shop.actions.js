import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => (dispatch) => {
	// Implementing a promise-based pattern instead of a suscription based one
	const collectionRef = firestore.collection('collections');

	// Starting the fetching process
	dispatch(fetchCollectionsStart());

	// Whenever the collections updates or when this code run for the first time
	// we'll get a snapshot of the collection data
	collectionRef
		.get()
		.then((snapshot) => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			dispatch(fetchCollectionsSuccess(collectionsMap));
		})
		.catch((error) => {
			dispatch(fetchCollectionsFailure(error.message));
		});
};
