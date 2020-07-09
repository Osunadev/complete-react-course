import { all, put, call, takeLatest } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

/** Workers */
// This is just a simple example about how to use one saga after
// another, when the previous saga dispatches an action that the
// following saga is listening to
function* clearCartOnSignOut() {
	yield put(clearCart());
}

/** Watchers */
// Basically we're 'chaining' the dispatch that the signOutUser worker saga
// makes, which is an action of type SIGN_OUT_SUCCESS. We're listening to that
// action which that saga dispatches and then we're going to dispatch another
// action in a dedicated saga that we create
function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
	yield all([call(onSignOutSuccess)]);
}
