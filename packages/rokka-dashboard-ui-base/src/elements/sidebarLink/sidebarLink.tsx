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

interface StyledLinkProps {
  /** Is link currently active */
  active?: boolean;
  /** Is sub navigation item */
  sub?: boolean;
}

const ActiveStyle = css`
  background: rgba(255, 255, 255, 0.05);
  border-color: ${colors.brand.light};
`;

const StyledLink = styled.a<StyledLinkProps>`
  font-size: ${({ sub }) => (sub ? fonts.Sizes.small : fonts.Sizes.large)};
  padding: ${({ sub }) => (sub ? `${spaces.small} ${spaces.medium}` : spaces.medium)};
  position: relative;
  border-left: 8px solid transparent;
  display: block;
  color: ${colors.tints.white};
  text-decoration: none;
  transition: background 0.2s ease, border 0.2s ease;

  ${({ active }) => active && ActiveStyle}

  :hover {
    transition: background 0.2s ease, border 0.2s ease;
    ${ActiveStyle}
  }
`;
