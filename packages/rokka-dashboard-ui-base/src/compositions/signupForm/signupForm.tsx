import React, { FormEvent, Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import { FormGroup, LoadingIndicatingButton, SignForm } from '../../components';
import { Heading2, Link, ParagraphWhite, TextInput } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography';
import { spaces } from '../../identity/spaces/spaces';

export type SignupSuccessCb = (done: () => void) => void;

interface SignupProps {
  /** Callback fired if form is submitted */
  onSignup(organization: string, email: string, successCb: SignupSuccessCb): Promise<void>;
}

interface SignupState {
  /** Entered organization */
  organization?: string;
  /** Entered Email */
  email?: string;
  /** Loading indicator */
  loading?: boolean;
  /** Start transition */
  showTransition?: boolean;
}

export class SignupForm extends PureComponent<SignupProps, SignupState> {
  public state = { organization: '', email: '', loading: false, showTransition: false };

  public handleChange = (name: string, value: string) => this.setState({ [name]: value });

  public handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ loading: true });

    const { organization, email } = this.state;

    const successCb = (done: () => void) => {
      this.setState({
        showTransition: true,
        loading: false
      });
      setTimeout(done, 1000);
    };

    await this.props.onSignup(organization, email, successCb);
  };

  public render() {
    const { organization, email, loading, showTransition } = this.state;
    const marketingText = (
      <Fragment>
        <Heading2 color={colors.tints.white}>Try out rokka for 90 days</Heading2>
        <ParagraphWhite>
          rokka is free to use for 90 days.
          <br />
          No monthly costs, no credit card required.
        </ParagraphWhite>
      </Fragment>
    );

    return (
      <SignForm isLogin={false} marketingText={marketingText} showTransition={showTransition}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label="Organization">
            <TextInput type="text" name="organization" value={organization} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="E-mail">
            <TextInput type="email" name="email" value={email} onChange={this.handleChange} />
          </FormGroup>
          <LoadingIndicatingButton loading={loading} type="submit">
            Start free trial
          </LoadingIndicatingButton>
          <StyledTermsParagraph>
            By creating an account, you agree to rokka's
            <StyledTermsLink href="https://rokka.io/assets/pdf/Rokka_Terms_of_use_EN.pdf">
              Terms & Conditions
            </StyledTermsLink>
          </StyledTermsParagraph>
        </form>
      </SignForm>
    );
  }
}

const StyledTermsParagraph = styled.p`
  font-size: ${fonts.Sizes.small};
  color: ${colors.gray.darkest};
`;

const StyledTermsLink = styled(Link)`
  font-size: ${fonts.Sizes.small};
  margin-left: ${spaces.xsmall};
`;
