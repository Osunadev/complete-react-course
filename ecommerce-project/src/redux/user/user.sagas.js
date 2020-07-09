import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInSuccess, signInFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);

		// Getting the data snapshot of our userRef from Firebase Firestore
		const userSnapshot = yield userRef.get();

		const formattedUser = {
			id: userSnapshot.id,
			...userSnapshot.data(),
		};

		yield put(signInSuccess(formattedUser));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// This is our worker saga
function* signInWithGoogle() {
	try {
		// We make a yield because auth.signInWithGoogle returns a Promise
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

/**
 * This is our watcher saga that listens when a GOOGLE_SIGN_IN_START
 * action gets dispatched to the store.
 *
 * IMPORTANT: In this example our GOOGLE_SIGN_IN_START action will
 * only be noticed by our saga, because we didn't add any case clause
 * inside the user.reducer switch statement, that was on purpose, so that
 * only our Saga will be notified when the action triggers, being ignored
 * by the user.reducer.
 */
function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Worker saga
/**
 * This worker saga will be receiving the actual action object that the
 * watcher saga is watching for, this is why we can access to its payload
 * property, because the Saga's middleware provides it to us
 */
function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Watcher saga
function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// This will group all of our user sagas into one array, so that we can
// merge it into a root saga and pass it down to the run method of the middleware
export function* userSagas() {
	yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
