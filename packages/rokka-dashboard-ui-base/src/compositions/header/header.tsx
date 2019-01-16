import React, { Component } from 'react';
import styled from 'styled-components';
import { HeaderNavigation } from '../../components';
import { HeaderLogo, MobileMenuButton } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

interface HeaderProps {
  /** Displayed username */
  username: string;
  /** Toggle menu callback */
  onToggleMenu(active: boolean): void;
  /** Logout callback */
  onLogout(): void;
}
interface HeaderState {
  /** Menu active indicator */
  menuActive: boolean;
}

export class Header extends Component<HeaderProps, HeaderState> {
  public state = { menuActive: false };

  public render() {
    const { menuActive } = this.state;
    const { username, onLogout } = this.props;

    return (
      <StyledHeader>
        <MobileMenuButton onClick={this.onMobileMenuButtonClick} active={menuActive} />
        <HeaderLogo width="6em" />
        <HeaderNavigation username={username} onLogout={onLogout} />
      </StyledHeader>
    );
  }

  private onMobileMenuButtonClick = () => {
    const { menuActive } = this.state;
    const { onToggleMenu } = this.props;
    this.setState(
      {
        menuActive: !menuActive
      },
      () => onToggleMenu(this.state.menuActive)
    );
  };
}

const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  padding: 0 ${spaces.medium};
  height: 64px;
  line-height: 64px;
  background: ${colors.brand.primary};
  z-index: 99;
`;
