import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import {
	selectIsCollectionFetching,
	selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
	async componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;

		// Starting the collections fetching
		fetchCollectionsStartAsync();
	}

	render() {
		const { match, isFetchingCollections, isCollectionsLoaded } = this.props;

		return (
			<div className="shop-page">
				<Route
					exact
					path={`${match.path}`}
					render={(routeProps) => (
						<CollectionsOverviewWithSpinner {...routeProps} isLoading={!isCollectionsLoaded} />
					)}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					render={(routeProps) => (
						<CollectionPageWithSpinner {...routeProps} isLoading={!isCollectionsLoaded} />
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetchingCollections: selectIsCollectionFetching,
	isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
