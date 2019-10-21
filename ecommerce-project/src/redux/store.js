import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// it's an array because we can have multiple middlewares
const middlewares = [logger];

// We're using array spread operator to spread our array middleware values
// as if they were passed directly as parameters to the applyMiddleware function
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
