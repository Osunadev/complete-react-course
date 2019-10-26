export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

	if (existingCartItem) {
		// We use the map function because we want to return a new array so that react re-renders our component
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
