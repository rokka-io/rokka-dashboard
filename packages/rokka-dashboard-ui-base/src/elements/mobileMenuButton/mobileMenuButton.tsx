import React from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { media } from '../../identity/media/media';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

interface MobileMenuButtonProps {
  /** Whether button is active */
  active?: boolean;
  /** Callback */
  onClick?(): void;
}

export function MobileMenuButton({ onClick, active = false }: MobileMenuButtonProps) {
  return <StyledMobileMenuButton active={active} type="button" onClick={onClick} />;
}

interface StyledMobileMenuButtonProps {
  active?: boolean;
}

// TODO: move to own element
const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.small};
  line-height: inherit;
  display: inline;
  margin: 0;
  padding: 0;
`;

const StyledMobileMenuButton = styled(LinkButton)<StyledMobileMenuButtonProps>`
  transition: background 0.4s ease;
  display: inline-block;
  height: ${spaces.large};
  width: ${spaces.large};
  border-radius: 4px;
  color: ${colors.tints.white};
  font-size: ${fonts.Sizes.large};
  margin-right: ${spaces.medium};
  vertical-align: middle;
  position: relative;

  ${media.desktop`
    display: none;
  `}

  ${({ active }) =>
    active &&
    `
      border: 1px solid ${colors.tints.white};
      background: rgba(0,0,0,.1);
    `}

  &:after {
    top: 50%;
    left: 50%;
    position: absolute;
    content: '☰';
    transform: translate(-50%, -50%);
  }
`;
