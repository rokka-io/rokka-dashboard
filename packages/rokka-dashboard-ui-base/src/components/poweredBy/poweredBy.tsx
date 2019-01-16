import React from 'react';
import styled from 'styled-components';
import { LiipIcon } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

export function PoweredBy() {
  return (
    <StyledLink href="https://www.liip.ch" target="_blank" rel="noopener">
      POWERED BY <StyledLiipIcon height="16px" />
    </StyledLink>
  );
}

const StyledLink = styled.a`
  transition: 0.4s ease opacity;
  color: ${colors.tints.white};
  font-size: ${fonts.Sizes.large};
  text-decoration: none;
  position: absolute;
  bottom: ${spaces.medium};
  left: ${spaces.medium};
  opacity: 0.2;

  :hover {
    transition: 0.4s ease opacity;
    opacity: 1;
  }
`;

const StyledLiipIcon = styled(LiipIcon)`
  display: inline-block;
  margin-top: -4px;
  margin-left: 2px;
`;
