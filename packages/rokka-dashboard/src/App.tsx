import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

export const App = () => (
  <HashRouter>
    <Route path="/" exact={true} component={Dashboard} />
  </HashRouter>
);
