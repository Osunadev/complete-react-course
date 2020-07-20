// @ts-nocheck
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
  {
    collections {
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

// We've used this Container pattern before, which is just responsible
// for getting the data we're passing down to our component
const CollectionsOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, error, data }) =>
      loading ? (
        <Spinner />
      ) : (
        <CollectionsOverview collections={data.collections} />
      )
    }
  </Query>
);

export default CollectionsOverviewContainer;
