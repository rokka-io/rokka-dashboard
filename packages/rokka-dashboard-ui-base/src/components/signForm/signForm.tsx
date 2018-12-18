import { Box, Flex } from '@rebass/grid';
import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { HeaderLogo, ParagraphLoginBrand } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { media } from '../../identity/media/media';
import { spaces } from '../../identity/spaces/spaces';

interface SignFormProps {
  /** Right column containing e.g. a form */
  children: ReactNode;
  /** Left side text below header logo */
  marketingText: ReactNode;
  /** Login / Signup layout toggle */
  isLogin: boolean;
}

interface StyledSignFormContainerProps {
  /** Login / Signup layout toggle */
  isLogin: boolean;
}

export const SignForm: FunctionComponent<SignFormProps> = ({ children, marketingText, isLogin }) => (
  <StyledSignFormPage>
    <StyledSignFormContainer isLogin={isLogin}>
      <Flex flexDirection={['column', 'column', 'column', 'row']}>
        <Box width={[12 / 12, 12 / 12, 12 / 12, 5 / 12]}>
          <StyledLeftColumn isLogin={isLogin}>
            <HeaderLogo marginBottom={spaces.large} />
            {marketingText}
            <ParagraphLoginBrand>Powered by Liip.</ParagraphLoginBrand>
          </StyledLeftColumn>
        </Box>
        <Box
          width={[12 / 12, 12 / 12, 12 / 12, 7 / 12]}
          p={[spaces.large, spaces.medium]}
          pl={[spaces.small, spaces.medium]}
        >
          {children}
        </Box>
      </Flex>
    </StyledSignFormContainer>
  </StyledSignFormPage>
);

// TODO: maybe move to own element
const StyledSignFormContainer = styled.div<StyledSignFormContainerProps>`
  width: 100%;
  background: ${colors.tints.white};
  position: static;
  ${media.tabletAndUp`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ isLogin }: StyledSignFormContainerProps) => (isLogin ? '600px' : '600px')}
  `}
  ${media.desktop`
    width: ${({ isLogin }: StyledSignFormContainerProps) => (isLogin ? '700px' : '750px')}
  `}
`;

// TODO: maybe move to own element
const StyledSignFormPage = styled.div`
  min-height: 100vh;
  background: ${colors.tints.white};

  ${media.tabletAndUp`
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
  `}
`;

// TODO: maybe move to own element
const StyledLeftColumn = styled.div<StyledSignFormContainerProps>`
  height: ${({ isLogin }) => (isLogin ? '200px' : '240px')};
  position: relative;
  background: linear-gradient(14deg, ${colors.brand.lightest} 0%, ${colors.brand.primary} 58%);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: ${spaces.large} ${spaces.medium} 0;

  ${media.desktop`
    padding: ${spaces.large};
    height: ${({ isLogin }: StyledSignFormContainerProps) => (isLogin ? '270px' : '440px')};
  `}
`;
