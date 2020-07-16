import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

const ShopPage = ({ match }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Starting the collections fetching
		dispatch(fetchCollectionsStart());
		console.log('Dispatch shop page');
	}, [dispatch]);

	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
		</div>
	);
};

export default ShopPage;
