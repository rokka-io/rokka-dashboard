import React, { FunctionComponent } from 'react';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired } from '../../hoc/withAuthRequired';
import { withState } from '../../hoc/withState';
import { BaseLayout } from '../../layouts/BaseLayout/BaseLayout';
import { AppUser } from '../../state';
import { pick } from '../../utils/pick';

interface DashboardProps {
  user: AppUser;
  showSidebar: boolean;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ user, showSidebar }) => {
  console.log('rerender dashboard');
  return (
    <BaseLayout user={user} showSidebar={showSidebar}>
      <GlobalStyle />
      <div>Dashboard</div>
    </BaseLayout>
  );
};

export default withState(withAuthRequired(Dashboard), s => pick(s, 'user', 'showSidebar'));
