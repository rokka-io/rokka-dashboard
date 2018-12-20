import React, { FunctionComponent, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

interface SidebarLinkProps {
  /** Where the link leads to */
  href?: string;
  /** Is link currently active */
  active?: boolean;
  /** Is sub navigation item */
  sub?: boolean;
  /** Content of link */
  children: ReactNode;
}

export const SidebarLink: FunctionComponent<SidebarLinkProps> = ({ children, active, sub, href }) => (
  <StyledLink href={href} active={active} sub={sub}>
    {children}
  </StyledLink>
);

export const SidebarLinkIcon: FunctionComponent<SidebarLinkProps> = ({ children, active, sub, href }) => (
  <StyledLinkIcon href={href} active={active} sub={sub}>
    {children}
  </StyledLinkIcon>
);

interface StyledLinkProps {
  /** Is link currently active */
  active?: boolean;
  /** Is sub navigation item */
  sub?: boolean;
}

const ActiveStyle = css`
  transition: background 0.2s ease, border 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  border-color: ${colors.brand.light};
`;

const StyledLink = styled.a<StyledLinkProps>`
  font-size: ${({ sub }) => (sub ? fonts.Sizes.small : fonts.Sizes.large)};
  padding: ${({ sub }) => (sub ? `${spaces.small} ${spaces.medium}` : spaces.medium)};
  border-left: 8px solid transparent;
  display: block;
  color: ${colors.tints.white};
  text-decoration: none;
  transition: background 0.2s ease, border 0.2s ease;

  ${({ active }) => active && ActiveStyle}

  :hover {
    ${ActiveStyle}
  }
`;

const ActiveStyleIcon = css`
  transition: 0.3s ease color;
  color: ${colors.brand.primary};
`;

const StyledLinkIcon = styled.a<StyledLinkProps>`
  transition: 0.3s ease color;
  position: absolute;
  right: ${({ sub }) => (sub ? spaces.small : spaces.medium)};
  top: ${({ sub }) => (sub ? spaces.small : spaces.medium)};
  color: ${colors.tints.white};

  ${({ active }) => active && ActiveStyleIcon}

  :hover {
    ${ActiveStyleIcon}
  }
`;
