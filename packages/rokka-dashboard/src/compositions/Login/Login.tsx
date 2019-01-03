import React from 'react';
import { GlobalStyle, LoginForm } from 'rokka-dashboard-ui-base';
import { login } from '../../state';

export const Login = () => (
  <>
    <GlobalStyle />
    <LoginForm onLogin={login} />
  </>
);
