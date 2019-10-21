import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
	/* We are explicitly declaring a method which initial value is null */
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		/* unsubscribeFromAuth --- auth.onAuthStateChanged returns a function that helps us to unsubscribe 
		to the open subscription of the auth handling */
		/* 	auth.onAuthStateChanged method helps us to know when the user has logged out or logged in.
			This observer is only trigerred on sign-in or sing-out */
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			/* userAuth is a Firebase User */
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				/* Basically we're getting an Snapshot of the document information (the user info) stored in Firestore */
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						/* displayName, email, createdAt */
						...snapShot.data()
					});

					// console.log(this.state);
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
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route
						exact
						path='/signin'
						render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
	/* 	dispatch() it's a way for redux to know that whatever object we are passing in, is going
			to be an action object that we're going to pass down to every reducer. */

	// We're just dispatching the object returned by our setCurrentUser action
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

/* 	connect can get two arguments: mapStateToProps and mapDispatchToProps
		but we don't need to get any store state, so the first one is null */

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
