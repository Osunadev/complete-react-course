import { gql } from 'apollo-boost';

/**
 * We're extending the Mutation type because we know that
 * backend has defined some Mutations implementations and,
 * we want to extend (inherit) those Mutations and add Mutations
 * of our own
 *
 * Here we're creating our own mutations to modify
 * our Local Cache where we defined our cartHidden state
 */

// ToggleCartHidden is capitalized because type definitions
// should always be capitalized
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

// This @client directive is telling Apollo to look
// this cartHidden property in our Local Cache and not
// in our backend
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // Get get the 'data' object from our cache, and, since we're only
      // interested in the cartHidden attribute, we destructure it
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      // Updating our cache value in the same location that we read before
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      // This is what we'll get when we run the toggleCartHidden mutation on the client
      return !cartHidden;
    },
  },
};
