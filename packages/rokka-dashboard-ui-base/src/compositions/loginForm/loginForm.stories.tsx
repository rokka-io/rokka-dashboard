import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { colors } from '../../identity/colors/colors';
import { LoginForm, SuccessCb } from './loginForm';

const LoginContainer = () => {
  const [loggedin, setLoggedin] = useState(false);
  const onLogin: (organization: string, apiKey: string, successCb: SuccessCb) => Promise<void> = (
    _organization: string,
    _apiKey: string,
    successCb: SuccessCb
  ) => {
    const done = () => {
      setLoggedin(true);
    };
    return new Promise(resolve => {
      setTimeout(() => {
        successCb(done);
        resolve();
      }, 500);
    });
  };

  if (loggedin) {
    setTimeout(() => {
      setLoggedin(false);
    }, 2000);
    return <span>Loggedin</span>;
  }
  return <LoginForm onLogin={onLogin} />;
};

storiesOf('Compositions', module)
  // TODO: decide if we want to move that to a separate decorator so it can be used somewhere else, too.
  .addDecorator(story => (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: colors.gray.lightest }}>
      {story()}
    </div>
  ))
  .add('LoginForm', () => <LoginContainer />);
