import React, { ChangeEvent, FormEvent, Fragment, PureComponent } from 'react';
import { FormGroup } from '../../components/formGroup/formGroup';
import { LoadingIndicatingButton } from '../../components/loadingIndicatingButton/loadingIndicatingButton';
import { SignForm } from '../../components/signForm/signForm';
import { Heading2 } from '../../elements/heading2/heading2';
import { Input } from '../../elements/input/input';
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
            <Input type="text" name="organization" value={organization} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="API Key">
            <Input type="password" name="apiKey" value={apiKey} onChange={this.handleChange} />
          </FormGroup>
          <LoadingIndicatingButton loading={loading} type="submit">
            Login
          </LoadingIndicatingButton>
        </form>
      </SignForm>
    );
  }
}
