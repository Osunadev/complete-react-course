import { createContext } from 'react';

// null as an initial value because at the beginning of our app, we don't have any user
const CurrentUserContext = createContext(null);

export default CurrentUserContext;
