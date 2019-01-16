import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

interface SidebarLinkProps {
  /** Target location */
  to: string;
  /** Is link currently active */
  active?: boolean;
  /** Is sub navigation item */
  small?: boolean;
  /** Content of link */
  children: ReactNode;
}

export function SidebarLink({ children, active, small, ...props }: SidebarLinkProps) {
  return (
    <StyledLink active={active} small={small} {...props}>
      {children}
    </StyledLink>
  );
}

export function SidebarLinkIcon({ children, active, small, ...props }: SidebarLinkProps) {
  return (
    <StyledLinkIcon active={active} small={small} {...props}>
      {children}
    </StyledLinkIcon>
  );
}

interface StyledLinkProps {
  /** Is link currently active */
  active?: boolean;
  /** Is sub navigation item */
  small?: boolean;
}

const ActiveStyle = css`
  transition: background 0.2s ease, border 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  border-color: ${colors.brand.light};
`;

const StyledLink = styled(({ active, small, ...props }) => <Link {...props} />)<StyledLinkProps>`
  font-size: ${({ small }) => (small ? fonts.Sizes.small : fonts.Sizes.sidebar)};
  padding: ${({ small }) => (small ? `${spaces.small} ${spaces.medium}` : spaces.medium)};
  border-left: 8px solid transparent;
  display: block;
  color: ${colors.tints.white};
  text-decoration: none;
  transition: background 0.2s ease, border 0.2s ease;

  ${/* sc-block */ ({ active }) => active && ActiveStyle}

  :hover {
    ${ActiveStyle}
  }
`;

const ActiveStyleIcon = css`
  transition: 0.3s ease color;
  color: ${colors.brand.primary};
`;

const StyledLinkIcon = styled(({ active, small, ...props }) => <Link {...props} />)<StyledLinkProps>`
  transition: 0.3s ease color;
  position: absolute;
  right: ${({ small }) => (small ? spaces.small : spaces.medium)};
  top: ${({ small }) => (small ? spaces.small : spaces.medium)};
  color: ${colors.tints.white};

  ${/* sc-block */ ({ active }) => active && ActiveStyleIcon}

  :hover {
    ${ActiveStyleIcon}
  }
`;
