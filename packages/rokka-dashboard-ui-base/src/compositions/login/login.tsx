import { Box, Flex } from '@rebass/grid';
import React, { ChangeEvent, FormEvent, PureComponent } from 'react';
import styled from 'styled-components';
import { FormGroup } from '../../components/formGroup/formGroup';
import { Button } from '../../elements/button/button';
import { Heading2 } from '../../elements/heading2/heading2';
import { Input } from '../../elements/input/input';
import { ParagraphLoginBrand } from '../../elements/paragraph/paragraph';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

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

    return (
      <StyledLoginPage>
        <StyledLoginContainer>
          <Flex>
            <StyledLeftColumn width={5 / 12}>
              <img src="" />
              <Heading2 color={colors.tints.white}>Web images done right.</Heading2>
              <ParagraphLoginBrand>Powered by Liip.</ParagraphLoginBrand>
            </StyledLeftColumn>
            <Box width={7 / 12} p={[spaces.large, spaces.medium]} pl={[spaces.small, spaces.medium]}>
              <form onSubmit={this.handleSubmit}>
                <FormGroup label="Organization">
                  <Input type="text" name="organization" value={organization} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup label="API Key">
                  <Input type="password" name="apiKey" value={apiKey} onChange={this.handleChange} />
                </FormGroup>
                <Button type="submit">Login</Button>
              </form>
            </Box>
          </Flex>
        </StyledLoginContainer>
      </StyledLoginPage>
    );
  }
}

// TODO: maybe move to own element
const StyledLoginContainer = styled.div`
  width: 700px;
  height: 270px;
  background: ${colors.tints.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// TODO: maybe move to own element
const StyledLoginPage = styled.div`
  transition: opacity 0.5s ease;
  background: linear-gradient(${colors.gray.lightest}, ${colors.gray.light}) no-repeat fixed;
  overflow-x: hidden;

  :after {
    content: '';
    background: ${colors.brand.primary};
    opacity: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    left: 0;
    z-index: -1;
  }
`;

// TODO: maybe move to own element
const StyledLeftColumn = styled(Box)`
  position: relative;
  background: linear-gradient(14deg, ${colors.brand.lightest} 0%, ${colors.brand.primary} 58%);
  padding: ${spaces.large} ${spaces.medium};
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;
