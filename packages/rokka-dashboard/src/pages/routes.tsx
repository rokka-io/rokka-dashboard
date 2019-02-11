import React, { FunctionComponent, ReactNode } from 'react';
import { NavigationLink } from '../components/NavigationLink/NavigationLink';
import { StacksNavigation } from '../compositions/StacksNavigation.tsx/StacksNavigation';
import { Dashboard } from './Dashboard/Dashboard';
import { Images } from './Images/Images';
import { NewStack } from './NewStack/NewStack';
import { Stacks } from './Stacks/Stacks';

interface Route {
  name: string;
  path: string;
  PageComponent: FunctionComponent<any>;
  navigationComponent?: ReactNode;
  exact?: boolean;
  relative?: boolean;
}

const dashboard = {
  name: 'Dashboard',
  path: '/',
  exact: true
};
const images = {
  name: 'Images',
  path: '/images'
};
const stacks = {
  name: 'Stacks',
  path: '/stacks'
};
const newStack = {
  name: 'New Stack',
  path: '/new-stack'
};

export const routes: Route[] = [
  {
    name: dashboard.name,
    path: dashboard.path,
    exact: dashboard.exact,
    PageComponent: Dashboard,
    navigationComponent: <NavigationLink name={dashboard.name} path={dashboard.path} exact={dashboard.exact} />
  },
  {
    name: images.name,
    path: images.path,
    PageComponent: Images,
    navigationComponent: <NavigationLink name={images.name} path={images.path} />
  },
  {
    name: 'Stacks',
    path: '/stacks',
    PageComponent: Stacks,
    relative: true,
    navigationComponent: <StacksNavigation stacksRoute={stacks} newStackRoute={newStack} />
  },
  {
    name: newStack.name,
    path: newStack.path,
    PageComponent: NewStack
  }
];

export const navigation: Route[] = routes.filter(({ navigationComponent }) => !!navigationComponent);
