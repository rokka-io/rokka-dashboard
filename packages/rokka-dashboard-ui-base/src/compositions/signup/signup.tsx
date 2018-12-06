import React, { ChangeEvent, FormEvent, Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import { FormGroup } from '../../components/formGroup/formGroup';
import { LoadingIndicatingButton } from '../../components/loadingIndicatingButton/loadingIndicatingButton';
import { SignForm } from '../../components/signForm/signForm';
import { Heading2 } from '../../elements/heading2/heading2';
import { Input } from '../../elements/input/input';
import { Link } from '../../elements/link/link';
import { ParagraphWhite } from '../../elements/paragraph/paragraph';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography/index';

interface SignupProps {
  /** Display loading indicator */
  loading?: boolean;
  /** Callback fired if form is submitted */
  onSignup(organization: string, email: string): void;
}

interface SignupState {
  /** Entered organization */
  organization?: string;
  /** Entered Email */
  email?: string;
}

export class Signup extends PureComponent<SignupProps, SignupState> {
  public state = { organization: '', email: '' };

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

    const { organization, email } = this.state;

    this.props.onSignup(organization, email);
  };

  public render() {
    const { organization, email } = this.state;
    const { loading } = this.props;
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
      <SignForm isLogin={false} marketingText={marketingText}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label="Organization">
            <Input type="text" name="organization" value={organization} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="E-mail">
            <Input type="email" name="email" value={email} onChange={this.handleChange} />
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
  font-size: ${fonts.sizes.small};
  color: ${colors.gray.darkest};
`;

const StyledTermsLink = styled(Link)`
  font-size: ${fonts.sizes.small};
  margin-left: ${spaces.xsmall};
`;
