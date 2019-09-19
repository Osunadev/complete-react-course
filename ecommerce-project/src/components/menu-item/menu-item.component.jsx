import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// match and history are objects provided by the Router using the withRouter HOC
const MenuItem = ({ title, imageUrl, size, linkUrl, match, history, location }) => {
  console.log({ location, match, history });
  return (
    // match.url is the complete url
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='content'>
        <div className='title'>{title.toUpperCase()}</div>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
