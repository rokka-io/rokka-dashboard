import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button, LogoutIcon } from '../../elements';
import { media } from '../../identity/media/media';
import { spaces } from '../../identity/spaces/spaces';
import { User } from '../user/user';

interface HeaderNavigationProps {
  /** Displayed username */
  username: string;
  /** Logout callback */
  onLogout(): void;
}

export const HeaderNavigation: FunctionComponent<HeaderNavigationProps> = ({ username, onLogout }) => (
  <StyledHeaderNav>
    <User username={username} />
    <Button onClick={onLogout}>
      <StyledLogoutIcon width="23px" height="23px" />
    </Button>
  </StyledHeaderNav>
);

const StyledHeaderNav = styled.nav`
  height: ${spaces.xlarge};
  line-height: ${spaces.xlarge};
  float: right;

  ${media.mobile`
    display: none;
  `}
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  margin-left: ${spaces.medium};
  float: right;
  margin-top: 1.25rem; // 20px
`;
