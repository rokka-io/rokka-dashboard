import React, { FunctionComponent, ReactNode } from 'react';
import { Alert, AlertData, ErrorBoundary, Header, Main, Sidebar } from 'rokka-dashboard-ui-base';
import { AppUser } from '../../state';
import { Navigation } from './Navigation';

interface BaseLayoutProps {
  user: AppUser;
  children: ReactNode;
  alert?: AlertData;
  showSidebar: boolean;
}

export const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ user, children, alert, showSidebar = true }) => (
  <>
    <Header
      username={user.organization}
      onToggleMenu={() => console.log('onToggleMenu')}
      onLogout={() => console.log('onLogout')}
    />
    <Sidebar active={showSidebar}>
      <Navigation />
    </Sidebar>
    <Main>
      <Alert alert={alert} />
      <ErrorBoundary>{children}</ErrorBoundary>
    </Main>
  </>
);
