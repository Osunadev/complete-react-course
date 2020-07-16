import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';

import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
	// isLoading is going to be used by the WithSpinner HOC
	isLoading: (state) => !selectIsCollectionsLoaded(state),
});

export default compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);
