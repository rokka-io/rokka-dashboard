import React, { FunctionComponent } from 'react';

interface DashboardProps {}

export const Dashboard: FunctionComponent<DashboardProps> = props => {
  console.log('rerender dashboard', props);
  return <div>Dashboard</div>;
};
