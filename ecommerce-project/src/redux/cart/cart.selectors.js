import { createSelector } from 'reselect';

// Input selector: Selectors that just return a piece of the state
const selectCart = state => state.cart;

/* Now this selector is memoized 'cause we used the createSelector function */
export const selectCartItems = createSelector(
	// We pass down an array with n selectors we need
	/* [selectSomething, selectSomethingElse] is equivalent to passing selectSomething, selectSomethingElse without array */
	[selectCart],
	cart => cart.cartItems
);

export const selectCartHidden = createSelector(
	[selectCart],
	cart => cart.hidden
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accTotal, { price, quantity }) => accTotal + price * quantity, 0)
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accQuantity, { quantity }) => quantity + accQuantity, 0)
);
