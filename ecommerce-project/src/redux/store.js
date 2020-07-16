import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

// it's an array because we can have multiple middlewares
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}
// We're using array spread operator to spread our array middleware values
// as if they were passed directly as parameters to the applyMiddleware function
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// this persistor calls our persistStore method passing in our store so this persists or
// is essentially a persisted version of our store
export const persistor = persistStore(store);
