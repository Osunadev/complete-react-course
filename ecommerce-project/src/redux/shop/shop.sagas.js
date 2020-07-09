// It listens for every action of a specific type that we pass to it
import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
	// Inside a generator, sagas doesn't use the 'dispatch' keywoard
	// to dispatch actions, instead they use the 'put' effect.

	/* 'put' is the saga effect for dispatching actions, is exactly as 
		dispatch, the only thing that changes is that we need to yield it */

	try {
		const collectionRef = firestore.collection('collections');

		/**
		 * collectionRef.get() returns a pending Promise, that pending Promise
		 * is yielded to the middleware and that middleware waits until it resolves or
		 * rejects, after that happens, the middleware calls the next(resolvedValue) method on the
		 * fetchCllectionsAsync generator so that it can receive the snapshot value and store it
		 * into the snapshot variable.
		 *
		 * This is very similar to the await functionallity in async functions
		 */
		const snapshot = yield collectionRef.get();

		// We want to yield this call in case this convertCollectionsSnapshotToMap function
		// takes longer that we expect. We want to use this call method whenever we can, which
		// is an effect that invokes functions
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

		// Put just dispatches an normal action creator, which is an object with a type and payload
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	// FETCH_COLLECTIONS_START is the pattern that our saga is waiting to be matched
	// with the action we dispatch to the store

	// fetchCollectionsAsync will run in response to this takeLatest listener
	/* We have these yileds because we want them yield control of these sagas back to the library */

	// We have takeLatest instead of takeEvery because if we were to make multiple dispatches of
	// FETCH_COLLECTIONS_START, the last 'call' would have the most updated data from our database
	// So it's safe to say takeLatest is the best option
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
