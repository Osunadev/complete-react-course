import React from 'react';
import { useDispatch } from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';

import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price }) => {
	const dispatch = useDispatch();

	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_f2QLUW9NfThYVUmAiTvfGw9X00U3jFD7ZD';

	const onToken = async (token) => {
		try {
			// I need to change this to /payment if this static build is going to be
			// served by the express server
			const response = await fetch('http://localhost:4000/payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: priceForStripe, token }),
			});

			const resBody = await response.json();

			if (response.status === 200) {
				alert('Payment succesful!');
				dispatch(clearCart());
			} else {
				throw new Error(resBody.error);
			}
		} catch (error) {
			console.log('Payment error: ', error);
			alert('There was an issue with your payment. Please make sure you use the provided card.');
		}
	};

	return (
		// Basically this StripeCheckout helps us to generate a token to be
		// sent to the backend, and then, the api makes the transaction
		<StripeCheckout
			label="Pay Now"
			name="CRWN Clothing Ltd."
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			// This is a callback that we give when the payment is successful
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
