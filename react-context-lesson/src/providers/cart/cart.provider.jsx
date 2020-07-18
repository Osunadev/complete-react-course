import React, { createContext, useState, useEffect } from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartItemsCount,
  getCartItemsTotal,
} from './cart.utils';

// We are specifying the initial values of our context's state
/**
 * These functions, which basically doesn't do nothing, are
 * declared as a state because they'll be overwritten when
 * passing a new value to the Context Provider we're going to use
 */
export const CartContext = createContext({
  hidden: true,
  toggleCartHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItemsCount: 0,
  checkoutTotal: 0,
});

/**
 * As we know, when this Provider wraps a children, it's going to provide
 * the context's state so that the children can consume it, having access to it
 */
export const CartProvider = ({ children }) => {
  // We're basically leveraging the context's state to this CartProvider component
  // so that it can change its local state and update the CartContext state, when
  // passing down a modified 'value' prop, which has the same state signature
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Remember that we need to update our addItem and removeItem function so that
  // it behaves as supose to, when calling it.
  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));

  const clearItem = item => setCartItems(clearItemFromCart(cartItems, item));
  const toggleCartHidden = () => setHidden(!hidden);

  // Everytime our cartItems array changes, we're going to update
  // our cartItemsCount value
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCheckoutTotal(getCartItemsTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleCartHidden,
        cartItems,
        addItem,
        removeItem,
        clearItem,
        cartItemsCount,
        checkoutTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
