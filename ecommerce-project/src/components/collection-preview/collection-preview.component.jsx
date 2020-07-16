import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, routeName }) => {
	const history = useHistory();
	const match = useRouteMatch();

	return (
		<div className="collection-preview">
			<h1 className="title" onClick={() => history.push(`${match.path}/${routeName}`)}>
				{title.toUpperCase()}
			</h1>
			<div className="preview">
				{items
					// Only showing the first 4 items of the collection
					.filter((item, idx) => idx < 4)
					.map((item) => (
						<CollectionItem key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
