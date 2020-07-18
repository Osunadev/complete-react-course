import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from './providers/cart/cart.provider';

import './index.css';
import App from './App';

// The CartProvider wraps our entire application so that
// the children can consume the CartContext state
ReactDOM.render(
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>,
  document.getElementById('root')
);
