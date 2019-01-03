import React, { FunctionComponent } from 'react';
import { GlobalStyle } from 'rokka-dashboard-ui-base';
import { withAuthRequired } from '../../hoc/withAuthRequired';
import { withState } from '../../hoc/withState';
import { AppUser } from '../../state';
import { pick } from '../../utils/pick';
import { Maybe } from '../../utils/types';

interface DashboardProps {
  user: Maybe<AppUser>;
}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return (
    <>
      <GlobalStyle />
      <div>Dashboard</div>
    </>
  );
};

export default withState(withAuthRequired(Dashboard), s => pick(s, 'user'));
