import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
	[selectShop],
	shop => shop.collections
);

// This selector method converts our collections object into an array so that
// our Collections-Overview component gets down a nice shaped array
export const selectCollectionsForPreview = createSelector(
	[selectShopCollections],
	collections => collections
		? Object.keys(collections).map(collectionKey => collections[collectionKey])
		: []
);

export const selectCollection = collectionUrlParam =>
	createSelector(
		[selectShopCollections],
		collections => (collections ? collections[collectionUrlParam] : null)
	);
