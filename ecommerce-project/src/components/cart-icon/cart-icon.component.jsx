import React from 'react';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { createStructuredSelector } from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div className="cart-icon" onClick={toggleCartHidden}>
		<ShoppingIcon className="shopping-icon" />
		<span className="item-count">{itemCount}</span>
	</div>
);

// Here, we're using what's called a SELECTOR, because we're selecting an specific key value of our big state
// and using it to obtain another value

// The old way (without using selectors) was:
/*
	const mapStateToProps = state => ({
		itemCount: state.cart.cartItems.reduce((accQuantity, { quantity }) => quantity + accQuantity, 0)
	})
*/
// And this wouldn't be memoized (cached), so everytime we would get to update our component (by getting new props)
// we would need to do this large calculation over and over again (imagine having several cartItems)

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartIcon);
