import React from 'react';
import { routes } from '../../pages/routes';

export const Navigation = () => (
  <>
    {routes.map(({ name, NavigationComponent, ...props }) => (
      <li key={name}>
        <NavigationComponent name={name} {...props} />
      </li>
    ))}
  </>
);
