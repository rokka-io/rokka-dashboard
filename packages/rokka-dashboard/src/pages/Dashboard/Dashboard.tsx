import React, { FunctionComponent } from 'react';
import { WithAuthRequired } from '../../hoc/withAuthRequired';

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return <div>Dashboard</div>;
};

export default WithAuthRequired(Dashboard);
