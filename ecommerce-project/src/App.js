import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth } from './firebase/firebase.utils';

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	}

	/* We are declaring a method which initial value is null */
	unsubscribeFromAuth = null;

	componentDidMount() {
		/* unsubscribeFromAuth --- auth.onAuthStateChanged returns a function that helps us to unsubscribe 
		to the open subscription of the auth handling */

		/* 	auth.onAuthStateChanged method helps us to know when the user has logged out or logged in.
			This observer is only trigerred on sign-in or sing-out */
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user });
		})

	}

	componentWillUnmount() {
		/* This will close the subscription to the auth handling firebase gives us */
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				{/* We'll always have the Header rendered in our app */}
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignUp} />
				</Switch>
			</div>
		);
	}
}

export default App;
