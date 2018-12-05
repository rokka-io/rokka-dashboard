import React, { Fragment, ChangeEvent, FormEvent, PureComponent } from 'react';
import { colors } from '../../identity/colors/colors';
import { Input } from '../../elements/input/input';
import { Button } from '../../elements/button/button';
import { Heading2 } from '../../elements/heading2/heading2';
import { FormGroup } from '../../components/formGroup/formGroup';
import { SignForm } from '../../components/signForm/signForm';

interface LoginProps {
  /** Callback fired if form is submitted */
  onLogin(organization: string, apiKey: string): void;
}

interface LoginState {
  /** Entered organization */
  organization?: string;
  /** Entered API key */
  apiKey?: string;
}

export class Login extends PureComponent<LoginProps, LoginState> {
  public state = { organization: '', apiKey: '' };

  public handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: move to separate function
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  public handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { organization, apiKey } = this.state;

    this.props.onLogin(organization, apiKey);
  };

  public render() {
    const { organization, apiKey } = this.state;
    const marketingText = (
      <Fragment>
        <Heading2 color={colors.tints.white}>Web images done right.</Heading2>
      </Fragment>
    );

    return (
      <SignForm isLogin={true} marketingText={marketingText}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label="Organization">
            <Input type="text" name="organization" value={organization} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="API Key">
            <Input type="password" name="apiKey" value={apiKey} onChange={this.handleChange} />
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
      </SignForm>
    );
  }
}
