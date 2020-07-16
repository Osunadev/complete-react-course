import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...otherProps }) => {
	return (
		// In ...otherProps we're including isGoogleSignIn, inverted, etc..
		<CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
	);
};

export default CustomButton;
