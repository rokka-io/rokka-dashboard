import React, { FunctionComponent } from 'react';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired } from '../../hoc/withAuthRequired';
import { withState } from '../../hoc/withState';
import { BaseLayout } from '../../layouts/BaseLayout/BaseLayout';
import { AppUser } from '../../state';
import { pick } from '../../utils/pick';

interface ImagesProps {
  user: AppUser;
  showSidebar: boolean;
}

const Images: FunctionComponent<ImagesProps> = ({ user, showSidebar, ...props }) => {
  console.log('rerender images', props);
  return (
    <BaseLayout user={user} showSidebar={showSidebar}>
      <GlobalStyle />
      <div>Images</div>
    </BaseLayout>
  );
};

export default withState(withAuthRequired(Images), s => pick(s, 'user', 'showSidebar'));
