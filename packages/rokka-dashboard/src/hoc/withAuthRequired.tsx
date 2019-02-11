import React, { ComponentType } from 'react';
import { Login } from '../compositions/Login/Login';
import { AppUser } from '../state';

interface WithAuthRequiredProps {
  user: AppUser | null;
}
export interface WithUserProps {
  user: AppUser;
}

export function withAuthRequired<P extends WithUserProps>(Component: ComponentType<P>) {
  return ({ user = null, ...props }: WithAuthRequiredProps) =>
    user ? <Component user={user} {...props as any} /> : <Login />;
}
