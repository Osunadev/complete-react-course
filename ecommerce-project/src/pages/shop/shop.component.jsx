import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

	state = {
		loading: true
	}

	// To unsuscribe to the snapshot representation of our Shop Collections Array
	unsuscbribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;

		const collectionRef = firestore.collection('collections');

		// Whenever the collections updates or when this code run for the first time
		// we'll get a snapshot of the collection data
		collectionRef.onSnapshot(snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({ loading: false })
		})
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;

		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(routeProps) => <CollectionsOverviewWithSpinner {...routeProps} isLoading={loading} />} />
				<Route path={`${match.path}/:collectionId`} render={(routeProps) => <CollectionPageWithSpinner {...routeProps} isLoading={loading} />} />
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collections => dispatch(updateCollections(collections))
})

export default connect(null, mapDispatchToProps)(ShopPage);
