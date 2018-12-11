import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

class App extends Component {
  public render() {
    return (
      <HashRouter>
        <Route path="/" exact={true} component={Dashboard} />
      </HashRouter>
    );
  }
}

export default App;
