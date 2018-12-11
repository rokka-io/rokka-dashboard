import React, { Component } from 'react';
import { Login as LoginForm } from 'rokka-dashboard-ui-base';

export class Login extends Component {
  render() {
    return <LoginForm onLogin={(organization, apiKey) => console.log(organization, apiKey)} />;
  }
}
