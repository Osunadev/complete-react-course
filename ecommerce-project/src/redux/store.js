import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// it's an array because we can have multiple middlewares
const middlewares = [logger, thunk];

// We're using array spread operator to spread our array middleware values
// as if they were passed directly as parameters to the applyMiddleware function
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// this persistor calls our persistStore method passing in our store so this persists or
// is essentially a persisted version of our store
export const persistor = persistStore(store);
