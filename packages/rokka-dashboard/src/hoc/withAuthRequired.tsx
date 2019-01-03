import React, { ComponentType, FunctionComponent } from 'react';
import { Login } from '../compositions/Login/Login';
import { AppUser } from '../state';
import { Maybe } from '../utils/types';

export interface WithAuthRequiredProps {
  user: Maybe<AppUser>;
}

export const withAuthRequired = <P extends object>(
  Component: ComponentType<P & WithAuthRequiredProps>
): FunctionComponent<P & WithAuthRequiredProps> => props => {
  return props.user ? <Component {...props} /> : <Login />;
};
