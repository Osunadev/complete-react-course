import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

class App extends React.Component {
	/* We are explicitly declaring a method which initial value is null */
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		//	auth.onAuthStateChanged method helps us to know when the user has logged out or logged in.
		//	This observer is only trigerred on sign-in or sing-out
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// We pass a callback to the onSnapshot method to be called every time a new DocumentSnapshot is available.
				// This could be that we modify our document data, remove a document data, create a new document data, etc.
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						/* displayName, email, createdAt */
						...snapShot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
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
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/signin"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	/* 	dispatch() it's a way for redux to know that whatever object we are passing in, is going
			to be an action object that we're going to pass down to every reducer. */

	// We're just dispatching the object returned by our setCurrentUser action
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
