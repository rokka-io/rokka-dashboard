import { storiesOf } from '@storybook/react';
import React,  { useState } from 'react';
import { colors } from '../../identity/colors/colors';
import { SignupForm, SignupSuccessCb } from './signupForm';

const SignupContainer = () => {
  const [loggedin, setSignedin] = useState(false);
  const onSignup: (organization: string, email: string, successCb: SignupSuccessCb) => Promise<void> = (
    _organization: string,
    _email: string,
    SignupSuccessCb: SignupSuccessCb
  ) => {
    const done = () => {
      setSignedin(true);
    };
    return new Promise(resolve => {
      setTimeout(() => {
        SignupSuccessCb(done);
        resolve();
      }, 500);
    });
  };

  if (loggedin) {
    setTimeout(() => {
      setSignedin(false);
    }, 2000);
    return <span>Signed up</span>;
  }
  return <SignupForm onSignup={onSignup} />;
};

storiesOf('Compositions', module)
  // TODO: decide if we want to move that to a separate decorator so it can be used somewhere else, too.
  .addDecorator(story => (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: colors.gray.lightest }}>
      {story()}
    </div>
  ))
  .add('SignupForm', () => <SignupContainer />);
