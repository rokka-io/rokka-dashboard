import React, { FunctionComponent } from 'react';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired } from '../../hoc/withAuthRequired';
import { withState } from '../../hoc/withState';
import { BaseLayout } from '../../layouts/BaseLayout/BaseLayout';
import { AppUser } from '../../state';
import { pick } from '../../utils/pick';

interface StacksProps {
  user: AppUser;
  showSidebar: boolean;
}

const Stacks: FunctionComponent<StacksProps> = ({ user, showSidebar }) => {
  return (
    <BaseLayout user={user} showSidebar={showSidebar}>
      <GlobalStyle />
      <div>Stacks</div>
    </BaseLayout>
  );
};

export default withState(withAuthRequired(Stacks), s => pick(s, 'user', 'showSidebar'));
