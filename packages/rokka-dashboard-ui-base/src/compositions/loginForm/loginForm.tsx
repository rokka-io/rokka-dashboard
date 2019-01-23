import React, { FormEvent, Fragment, PureComponent } from 'react';
import { FormGroup, LoadingIndicatingButton, SignForm } from '../../components';
import { Heading2, TextInput } from '../../elements';
import { colors } from '../../identity/colors/colors';

export type SuccessCb = (done: () => void) => void;

interface LoginProps {
  /** Callback fired if form is submitted */
  onLogin(organization: string, apiKey: string, successCb: SuccessCb): Promise<void>;
}

interface LoginState {
  /** Entered organization */
  organization?: string;
  /** Entered API key */
  apiKey?: string;
  /** Loading indicator */
  loading?: boolean;
  /** Start transition */
  showTransition?: boolean;
}

export class LoginForm extends PureComponent<LoginProps, LoginState> {
  public state = { organization: '', apiKey: '', loading: false, showTransition: false };

  public handleChange = (name: string, value: string) => this.setState({ [name]: value });

  public handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ loading: true });

    const { organization, apiKey } = this.state;

    const successCb = (done: () => void) => {
      this.setState({
        showTransition: true,
        loading: false
      });
      setTimeout(done, 1000);
    };
    await this.props.onLogin(organization, apiKey, successCb);
  };

  public render() {
    const { organization, apiKey, loading, showTransition } = this.state;
    const marketingText = (
      <Fragment>
        <Heading2 color={colors.tints.white}>Web images done right.</Heading2>
      </Fragment>
    );

    return (
      <SignForm isLogin={true} marketingText={marketingText} showTransition={showTransition}>
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