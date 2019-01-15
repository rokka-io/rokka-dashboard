import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { SidebarLink } from 'rokka-dashboard-ui-base';

export interface NavigationLinkProps {
  path: string;
  name: string;
  matchPath?: (path: string) => boolean;
  exact?: boolean;
}

export const NavigationLink: FunctionComponent<NavigationLinkProps> = ({ path, exact, name, matchPath }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match, location }) => (
      <SidebarLink to={path} active={!!match || (matchPath && matchPath(location.pathname))}>
        {name}
      </SidebarLink>
    )}
  />
);
