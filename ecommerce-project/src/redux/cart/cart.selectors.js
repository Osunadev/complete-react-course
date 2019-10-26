import { createSelector } from 'reselect';

// Input selector: Selectors that just return a piece of the state
const selectCart = state => state.cart;

/* Now this selector is memoized 'cause we used the createSelector function */
export const selectCartItems = createSelector(
	// We pass down an array with n selectors we need
	[selectCart],
	cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accQuantity, { quantity }) => quantity + accQuantity, 0)
);
