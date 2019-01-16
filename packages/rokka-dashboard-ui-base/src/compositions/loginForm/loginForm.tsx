import React, { FormEvent, Fragment, PureComponent } from 'react';
import { FormGroup, LoadingIndicatingButton, SignForm } from '../../components';
import { Heading2, TextInput } from '../../elements';
import { colors } from '../../identity/colors/colors';

interface LoginProps {
  /** Display loading indicator */
  loading?: boolean;
  /** Callback fired if form is submitted */
  onLogin(organization: string, apiKey: string): void;
}

interface LoginState {
  /** Entered organization */
  organization?: string;
  /** Entered API key */
  apiKey?: string;
}

export class LoginForm extends PureComponent<LoginProps, LoginState> {
  public state = { organization: '', apiKey: '' };

  public handleChange = (name: string, value: string) => this.setState({ [name]: value });

  public handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { organization, apiKey } = this.state;

    this.props.onLogin(organization, apiKey);
  };

  public render() {
    const { organization, apiKey } = this.state;
    const { loading } = this.props;
    const marketingText = (
      <Fragment>
        <Heading2 color={colors.tints.white}>Web images done right.</Heading2>
      </Fragment>
    );

    return (
      <SignForm isLogin={true} marketingText={marketingText}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label="Organization">
            <TextInput name="organization" value={organization} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="API Key">
            <TextInput type="password" name="apiKey" value={apiKey} onChange={this.handleChange} />
          </FormGroup>
          <LoadingIndicatingButton loading={loading} type="submit">
            Login
          </LoadingIndicatingButton>
        </form>
      </SignForm>
    );
  }
}
