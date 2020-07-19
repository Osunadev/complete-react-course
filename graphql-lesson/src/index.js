import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

// Remember that our crwn-clothing server resides in this webpage
// It's the same that we used when playing in the playground
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

// This cache is kinda like a local storage for our application,
// because it'll cache the repeated requests we make to the server
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

// This query returns a promise with the data sent by the server
client
  .query({
    query: gql`
      {
        collections {
          title
          items {
            name
            price
            imageUrl
          }
        }
      }
    `,
  })
  .then(data => {
    console.log(data);
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
