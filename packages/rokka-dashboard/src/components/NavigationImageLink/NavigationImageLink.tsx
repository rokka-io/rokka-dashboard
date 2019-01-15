import React, { FunctionComponent, ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { Icon, SidebarLinkIcon } from 'rokka-dashboard-ui-base';

export interface NavigationImageLinkProps {
  path: string;
  exact?: boolean;
  icon: ReactElement<Icon>;
}

export const NavigationImageLink: FunctionComponent<NavigationImageLinkProps> = ({ path, exact, icon }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => (
      <SidebarLinkIcon to={path} active={!!match}>
        {icon}
      </SidebarLinkIcon>
    )}
  />
);
