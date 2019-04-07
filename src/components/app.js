import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Landing from './landing';
import Analyze from './analyze';

/* eslint no-unused-vars: 0 */

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/analyze" component={Analyze} />
        </Switch>
      </div>
    </Router>
  );
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/"> Home </NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/pricing"> Pricing </NavLink></li>
        <li><NavLink to="/contact"> Contact Us </NavLink></li>
      </ul>
    </nav>
  );
};


export default App;
