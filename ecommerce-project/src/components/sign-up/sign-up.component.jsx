import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart, signUpFailure } from '../../redux/user/user.actions';
import { selectSignUpError } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';

class SignUp extends React.Component {
	state = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		const { signUpStart, signUpFailure } = this.props;
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			signUpFailure("Passwords don't match");
		} else {
			signUpStart(email, password, displayName);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		const { signUpError } = this.props;

		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>sign up with your email and password</span>
				{signUpError && <span className="error-message">Error: {signUpError}</span>}
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						onChange={this.handleChange}
						label="Display Name"
						required
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						onChange={this.handleChange}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
						label="Confirm Password"
						required
					/>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (email, password, displayName) =>
		dispatch(signUpStart({ email, password, displayName })),
	signUpFailure: (errorMsg) => dispatch(signUpFailure(errorMsg)),
});

const mapStateToProps = createStructuredSelector({
	signUpError: selectSignUpError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
