import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HomeHats = () => {
  return <div>Hats</div>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HomeHats} />
      </Switch>
    </div>
  );
}

export default App;
