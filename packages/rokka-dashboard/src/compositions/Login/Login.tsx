import React, { FunctionComponent, useEffect } from 'react';
import { GlobalStyle, LoginForm } from 'rokka-dashboard-ui-base';
import { login, SESSION_COOKIE_KEY } from '../../state';
import { get as getCookie } from '../../utils/cookie';

export const Login: FunctionComponent = () => {
  useEffect(() => {
    const session = getCookie(SESSION_COOKIE_KEY);

    if (session && session.user) {
      const { user } = session;
      login(user.organization, user.apiKey);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoginForm onLogin={login} />
    </>
  );
};
