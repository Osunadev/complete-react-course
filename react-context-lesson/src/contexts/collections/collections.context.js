import { createContext } from 'react';

import SHOP_DATA from './shop.data';

// We capitalize this Context Because is basically a component
const CollectionsContext = createContext(SHOP_DATA); // This is the initial value of our context

export default CollectionsContext;
