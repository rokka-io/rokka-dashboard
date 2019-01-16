import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { AddIcon, SearchInput, ShowOnActive } from 'rokka-dashboard-ui-base';
import { NavigationImageLink } from '../../components/NavigationImageLink/NavigationImageLink';
import { NavigationLink } from '../../components/NavigationLink/NavigationLink';

interface RouteProps {
  name: string;
  path: string;
}

interface StacksNavigationProps {
  stacksRoute: RouteProps;
  newStackRoute: RouteProps;
}

export const StacksNavigation: FunctionComponent<StacksNavigationProps> = ({ stacksRoute, newStackRoute }) => {
  const matchPath = (path: string): boolean => path === stacksRoute.path || path === newStackRoute.path;
  return (
    <>
      <NavigationLink name={stacksRoute.name} path={stacksRoute.path} matchPath={matchPath} />
      <NavigationImageLink path={newStackRoute.path} icon={<AddIcon width="24" height="24" />} />
      <Route
        children={({ location }) => (
          <ShowOnActive active={matchPath(location.pathname)}>
            <SearchInput
              onChange={(...args) => {
                console.log(args);
              }}
              value=""
              placeholder="Search..."
            />
          </ShowOnActive>
        )}
      />
    </>
  );
};
