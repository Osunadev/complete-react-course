import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

/* 	The Provider component is a parent component that wraps our
		app so that it can use the Redux Store */
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Router>
				<App />
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
