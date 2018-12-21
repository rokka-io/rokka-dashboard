import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { PoweredBy } from '../../components/poweredBy/poweredBy';
import { colors } from '../../identity/colors/colors';
import { media } from '../../identity/media/media';
import { spaces } from '../../identity/spaces/spaces';
import { zIndex } from '../../identity/zIndex';

interface SidebarProps {
  active?: boolean;
  children: ReactNode;
}

export const Sidebar: FunctionComponent<SidebarProps> = ({ active = false, children }) => (
  <StyledNav active={active}>
    <StyledUl>{children}</StyledUl>
    <PoweredBy />
  </StyledNav>
);

interface StyledNavProps {
  active?: boolean;
}

const StyledNav = styled.nav<StyledNavProps>`
  position: fixed;
  left: 0;
  bottom: 0;
  top: ${spaces.xlarge};
  width: 13.75rem;
  background: ${colors.gray.sidebar};
  color: ${colors.gray.light};
  transform: translateX(-13.75rem);
  transition: transform .4s ease;
  z-index: ${zIndex.sidebar};

  ${media.desktop`
    transform: translateX(0);
  `}

  ${media.mobile`
    transform: translateX(-100%);
  `}

  ${({ active }) =>
    active &&
    `
    transform: translateX(0);
    transition: transform .4s ease;

    ${media.mobile`
      width: 100%;
    `}
  `}
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;

  > li {
    list-style: none;
  }
`;
