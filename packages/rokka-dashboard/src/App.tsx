import React, { FunctionComponent, memo } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { routes } from './pages/routes';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired, WithUserProps } from './hoc/withAuthRequired';
import { withState } from './hoc/withState';
import { BaseLayout } from './layouts/BaseLayout/BaseLayout';
import { AppUser } from './state';

interface AppProps extends WithUserProps {
  showSidebar: boolean;
}

const App: FunctionComponent<AppProps> = memo(({ user, showSidebar }) => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <BaseLayout user={user} showSidebar={showSidebar}>
          <>
            {routes.map(({ name, path, exact, PageComponent }) => {
              return <Route key={name} path={path} exact={exact} component={PageComponent} />;
            })}
          </>
        </BaseLayout>
      </Router>
    </>
  );
});

export const AppContainer = withState<{}, { user: AppUser | null; showSidebar: boolean }>(
  withAuthRequired(App),
  ({ user, showSidebar }) => ({
    user,
    showSidebar
  })
);
