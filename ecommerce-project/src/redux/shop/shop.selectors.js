import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector([selectShop], (shop) => shop.collections);

// This selector method converts our collections object into an array so that
// our Collections-Overview component gets down a nice shaped array
export const selectCollectionsForPreview = createSelector([selectShopCollections], (collections) =>
	collections ? Object.keys(collections).map((collectionKey) => collections[collectionKey]) : []
);

/* selectCollection */
// Since we're trying to memoizing a function that gets called everytime our
// Collection Page gets updated (when redux updates the mapStateToProps)
// we need to use Memoize from 'lodash' in order memoize the returned function
// so that everytime it gets called, it doesn't 'create a new instance'

// Memoize does the same idea of memoization as reselect does for our selectors,
// except this time we're memoizing the return of our function which returns our selector

// By wrapping this function is memoize, we're saying that whenever this function gets called
// and receives collectionUrlParam, I want to memoize the return of this function (in this case
// we return a selector). If this function gets called again with the same collectionUrlParam,
// don't rerun this function because we'll return the same value as last time, which we've
// memoized so just return the selector that's been stored.

export const selectCollection = memoize((collectionUrlParam) =>
	createSelector([selectShopCollections], (collections) =>
		collections ? collections[collectionUrlParam] : null
	)
);

export const selectIsCollectionFetching = createSelector([selectShop], (shop) => shop.isFetching);

export const selectIsCollectionsLoaded = createSelector([selectShop], (shop) => !!shop.collections);
