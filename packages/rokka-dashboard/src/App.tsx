import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { routes } from './pages/routes';

export const App = () => (
  <Router>
    <>
      {routes.map(({ name, path, exact, PageComponent }) => {
        return <Route key={name} path={path} exact={exact} component={PageComponent} />;
      })}
    </>
  </Router>
);
