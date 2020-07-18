import React, { useContext } from 'react';

import { CartContext } from '../../providers/cart/cart.provider';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  // We're only interested in the toggleCartHidden function, that's
  // why we're not destructuring other properties
  const { toggleCartHidden, cartItemsCount } = useContext(CartContext);

  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;
