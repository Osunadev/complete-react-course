import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccess = (user) => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
	payload: user,
});

export const googleSignInFailure = (error) => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
	payload: error,
});

// We need an email and password in order to start the
// login process connecting with our auth server (Firebase)
// emailAndPassword = { email: ..., password: ...}
export const emailSignInStart = (emailAndPassword) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const emailSignInSuccess = (user) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
	payload: user,
});

export const emailSignInFailure = (error) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
	payload: error,
});
