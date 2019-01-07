import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { SidebarLink } from 'rokka-dashboard-ui-base';

export interface NavigationLinkProps {
  path: string;
  exact?: boolean;
  name: string;
}

export const NavigationLink: FunctionComponent<NavigationLinkProps> = ({ path, exact, name }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => (
      <SidebarLink to={path} active={!!match}>
        {name}
      </SidebarLink>
    )}
  />
);
