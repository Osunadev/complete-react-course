import { all, call } from 'redux-saga/effects';

// We import all of our sagas
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
	yield all([call(fetchCollectionsStart), call(userSagas)]);
}
