import React, { FunctionComponent } from 'react';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired } from '../../hoc/withAuthRequired';
import { withState } from '../../hoc/withState';
import { BaseLayout } from '../../layouts/BaseLayout/BaseLayout';
import { AppUser } from '../../state';
import { pick } from '../../utils/pick';

interface NewStackProps {
  user: AppUser;
  showSidebar: boolean;
}

const NewStack: FunctionComponent<NewStackProps> = ({ user, showSidebar }) => {
  return (
    <BaseLayout user={user} showSidebar={showSidebar}>
      <GlobalStyle />
      <div>NewStack</div>
    </BaseLayout>
  );
};

export default withState(withAuthRequired(NewStack), s => pick(s, 'user', 'showSidebar'));
