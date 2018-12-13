import React from 'react';
import { GlobalStyle, LoginForm } from 'rokka-dashboard-ui-base';

export const Login = () => (
  <>
    <GlobalStyle />
    <LoginForm onLogin={(organization, apiKey) => console.log(organization, apiKey)} />
  </>
);
