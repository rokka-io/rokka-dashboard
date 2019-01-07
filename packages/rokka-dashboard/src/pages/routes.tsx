import { FunctionComponent } from 'react';
import { NavigationLink, NavigationLinkProps } from '../components/NavigationLink/NavigationLink';
import Dashboard from './Dashboard/Dashboard';
import Images from './Images/Images';

interface Route {
  name: string;
  path: string;
  PageComponent: FunctionComponent<any>;
  NavigationComponent: FunctionComponent<NavigationLinkProps>;
  exact?: boolean;
}

export const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/',
    exact: true,
    PageComponent: Dashboard,
    NavigationComponent: NavigationLink
  },
  {
    name: 'Images',
    path: '/images',
    PageComponent: Images,
    NavigationComponent: NavigationLink
  }
];
