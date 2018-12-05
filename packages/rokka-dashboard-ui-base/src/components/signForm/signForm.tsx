import { Box, Flex } from '@rebass/grid';
import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { HeaderLogo } from '../../elements/headerLogo/headerLogo';
import { ParagraphLoginBrand } from '../../elements/paragraph/paragraph';

interface SignFormProps {
  children: ReactNode;
  marketingText: ReactNode;
  isLogin: boolean;
}

interface StyledSignFormContainerProps {
  /** Login / Signup layout toggle */
  login: boolean;
}

export const SignForm: FunctionComponent<SignFormProps> = ({ children, marketingText, isLogin }) => (
  <StyledSignFormPage>
    <StyledSignFormContainer login={isLogin}>
      <Flex>
        <Box width={5 / 12}>
          <StyledLeftColumn login={isLogin}>
            <div>
              <HeaderLogo />
              {marketingText}
              <ParagraphLoginBrand>Powered by Liip.</ParagraphLoginBrand>
            </div>
          </StyledLeftColumn>
        </Box>
        <Box width={7 / 12} p={[spaces.large, spaces.medium]} pl={[spaces.small, spaces.medium]}>
          {children}
        </Box>
      </Flex>
    </StyledSignFormContainer>
  </StyledSignFormPage>
);

// TODO: maybe move to own element
const StyledSignFormContainer = styled.div<StyledSignFormContainerProps>`
  width: ${props => (props.login ? '700px': '750px')};
  height: ${props => (props.login ? '270px' : '440px')};
  background: ${colors.tints.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// TODO: maybe move to own element
const StyledSignFormPage = styled.div`
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
const StyledLeftColumn = styled.div<StyledSignFormContainerProps>`
  height: ${props => (props.login ? '270px' : '440px')};
  position: relative;
  background: linear-gradient(14deg, ${colors.brand.lightest} 0%, ${colors.brand.primary} 58%);
  padding: ${spaces.large} ${spaces.medium};
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;
