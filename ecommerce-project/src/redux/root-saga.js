import { all, call } from 'redux-saga/effects';

// We import all of our sagas
import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
	yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
