import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart, signUpFailure } from '../../redux/user/user.actions';
import { selectSignUpError } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';

const SignUp = () => {
	const signUpError = useSelector(selectSignUpError);
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { displayName, email, password, confirmPassword } = formValues;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			dispatch(signUpFailure("Passwords don't match"));
		} else {
			dispatch(signUpStart({ email, password, displayName }));
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormValues({ ...formValues, [name]: value });
	};

	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>sign up with your email and password</span>
			{signUpError && <span className="error-message">Error: {signUpError}</span>}
			<form className="sign-up-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					required
				/>
				<CustomButton type="submit">SIGN UP</CustomButton>
			</form>
		</div>
	);
};

export default SignUp;
