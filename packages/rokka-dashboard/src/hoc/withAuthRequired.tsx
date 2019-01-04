import React, { ComponentType, FunctionComponent } from 'react';
import { Login } from '../compositions/Login/Login';
import { AppUser } from '../state';

export interface WithAuthRequiredProps {
  user?: AppUser;
}

export const withAuthRequired = <P extends object>(
  Component: ComponentType<P & WithAuthRequiredProps>
): FunctionComponent<P & WithAuthRequiredProps> => props => {
  return props.user ? <Component {...props} /> : <Login />;
};
