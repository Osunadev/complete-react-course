import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

const ShopPage = ({ match, fetchCollectionsStart }) => {
	// Remember that if we don't specify any dependency to
	// our use effect, which is the array of dependencies
	// It'll run the effect callback every time our components
	// renders, no matter if it's the first or last time
	useEffect(() => {
		// Starting the collections fetching
		fetchCollectionsStart();
		// In this case we can pass as a dependency our fetchCollectionsStart
		// because we're confident that this props won't change, so it would
		// work as a componentDidMount. We are doing this instead of passing
		// just an empty array [] to avoid warnings in the console
	}, [fetchCollectionsStart]);

	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
