const UserActionTypes = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
	GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
	EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
	/**
	 * We don't need individual GOOGLE and EMAIL
	 * SIGN_IN_FAILURE or SIGN_IN_SUCCESS types because
	 * they behave the same
	 */
	SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
	SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
};

export default UserActionTypes;
