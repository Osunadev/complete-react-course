import { createContext } from 'react';

const CartContext = createContext({
  hidden: true,
  // This toggleHidden functions is going to be defined in the
  // component that we use the context Provider, that's why right
  // now it does nothing, but we didn't want to be null if it gets called
  toggleCartHidden: () => {},
});

export default CartContext;
