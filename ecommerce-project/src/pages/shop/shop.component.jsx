import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

class ShopPage extends Component {
	async componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;

		// Starting the collections fetching
		fetchCollectionsStartAsync();
	}

	render() {
		const { match } = this.props;

		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
