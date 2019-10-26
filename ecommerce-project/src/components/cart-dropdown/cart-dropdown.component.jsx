import React from 'react';

import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{cartItems.map(cartItem => (
				<CartItem key={cartItem.id} item={cartItem} />
			))}
		</div>
		<CustomButton>GO TO CHECKOUT</CustomButton>
	</div>
);

const mapStateToProps = state => ({
	// We're using a selector to optimize our app using memoization
	/* 	This is done so that our cart-dropdown doesn't re-render whenever the
			state changes that's unrelated to the cart items */
	cartItems: selectCartItems(state)
});

export default connect(
	mapStateToProps,
	null
)(CartDropdown);
