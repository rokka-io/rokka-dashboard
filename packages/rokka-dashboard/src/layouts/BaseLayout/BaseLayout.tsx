import React, { FunctionComponent, ReactNode } from 'react';
import { Alert, AlertData, ErrorBoundary, Header, Main, Sidebar } from 'rokka-dashboard-ui-base';

interface User {
  username: string;
}

interface BaseLayoutProps {
  user: User;
  children: ReactNode;
  alert: AlertData;
  showSidebar: boolean;
}

export const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ user, children, alert, showSidebar = true }) => (
  <>
    <Header
      username={user.username}
      onToggleMenu={() => console.log('onToggleMenu')}
      onLogout={() => console.log('onLogout')}
    />
    <Sidebar active={showSidebar}>Data</Sidebar>
    <Main>
      <Alert alert={alert} />
      <ErrorBoundary>{children}</ErrorBoundary>
    </Main>
  </>
);
