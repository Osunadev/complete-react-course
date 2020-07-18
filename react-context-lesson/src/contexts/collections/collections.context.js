import { createContext } from 'react';

import COLLECTIONS_DATA from './collections.data';

// We capitalize this Context Because is basically a component
const CollectionsContext = createContext(COLLECTIONS_DATA); // This is the initial value of our context

export default CollectionsContext;
