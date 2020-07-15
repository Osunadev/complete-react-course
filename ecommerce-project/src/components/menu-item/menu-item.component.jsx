import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import './menu-item.styles.scss';

// We're avoiding using the withRouter HOC to get the match and history values
// because we don't want to add an extra wrapping node to our tree hierarchy
// to avoid ending with a Virtual DOM with too much nested components
const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const history = useHistory();
	const match = useRouteMatch();

	return (
		// match.url is the complete url
		<div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
			<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="content">
				<div className="title">{title.toUpperCase()}</div>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</div>
	);
};

export default MenuItem;
