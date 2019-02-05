import React, { FunctionComponent, ReactNode } from 'react';
import { Alert, AlertData, ErrorBoundary, Header, Main, Sidebar } from 'rokka-dashboard-ui-base';
import { AppUser, toggleSidebar, logout } from '../../state';
import { Navigation } from './Navigation';

interface BaseLayoutProps {
  user: AppUser;
  children: ReactNode;
  showSidebar: boolean;
  alert?: AlertData;
}

export const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ user, children, alert, showSidebar }) => {
  console.log(showSidebar);
  return (
    <>
      <Header username={user.organization} onToggleMenu={toggleSidebar} onLogout={logout} />
      <Sidebar active={showSidebar}>
        <Navigation />
      </Sidebar>
      <Main>
        <Alert alert={alert} />
        <ErrorBoundary>{children}</ErrorBoundary>
      </Main>
    </>
  );
};
