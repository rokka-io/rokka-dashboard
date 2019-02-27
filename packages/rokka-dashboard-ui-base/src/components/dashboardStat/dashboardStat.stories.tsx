import { storiesOf } from '@storybook/react';
import React from 'react';

import { DashboardStat } from './dashboardStat';

storiesOf('Components / Dashboard', module).add('Stat', () => <DashboardStat stat="190 MB" label="Traffic" />);
