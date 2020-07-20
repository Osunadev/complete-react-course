import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Collection from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// Here, we're just specifying the schema we're going to use,
// explicityly saying that the $title variable that we pass to the
// Query Consumer component is a String, after we have this $title
// value we can make our query request to the server

// We can see it as query getCollectionByTitle defines like a 'function'
// that receives an argument named $title of type String! and, we use this
// argument to actually write our gql query, because it needs a title to make
// the Query to the backend server
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, data }) =>
      loading ? (
        <Spinner />
      ) : (
        <Collection collection={data.getCollectionsByTitle} />
      )
    }
  </Query>
);

export default CollectionContainer;
