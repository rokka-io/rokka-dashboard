import React from 'react';
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

export function HeaderNavigation({ username, onLogout }: HeaderNavigationProps) {
  return (
    <StyledHeaderNav>
      <User username={username} />
      <Button padding="0" onClick={onLogout}>
        <StyledLogoutIcon width="23px" height="23px" />
      </Button>
    </StyledHeaderNav>
  );
}

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
  margin-top: 1.25rem;
`;
