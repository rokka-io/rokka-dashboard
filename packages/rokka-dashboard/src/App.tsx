import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

export const App = () => (
  <Router>
    <Route path="/" exact={true} component={Dashboard} />
  </Router>
);
