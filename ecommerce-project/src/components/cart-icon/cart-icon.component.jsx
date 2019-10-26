import React from 'react';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div className='cart-icon' onClick={toggleCartHidden}>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>{itemCount}</span>
	</div>
);

const mapStateToProps = state => ({
	// Here, we're using what's called a SELECTOR, because we're selecting an specific key value of our big state
	// and using it to obtain another value
	itemCount: selectCartItemsCount(state)
});

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartIcon);
