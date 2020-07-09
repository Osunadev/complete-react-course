import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	error: null,
	signUpError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// Whatever sign in method we use, we always
		// update the currentUser property
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				error: null,
				signUpError: null,
			};
		case UserActionTypes.SIGN_OUT_FAILURE:
		case UserActionTypes.SIGN_IN_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null,
			};
		case UserActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				signUpError: action.payload,
				error: null,
			};
		default:
			return state;
	}
};

export default userReducer;
