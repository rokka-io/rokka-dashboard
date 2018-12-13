import React, { ComponentType, FunctionComponent } from 'react';
import { Login } from '../compositions/Login/Login';

export interface AuthenticationInformation {
  organization: string;
}

export interface WithAuthRequiredProps {
  auth?: AuthenticationInformation;
}

export const WithAuthRequired = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<P & WithAuthRequiredProps> => props => {
  return props.auth ? <Component {...props} /> : <Login />;
};
