import { storiesOf } from '@storybook/react';
import React from 'react';

import { DashboardChart } from './dashboardChart';

storiesOf('Components / Dashboard', module).add('Chart', () => <DashboardChart title="Traffic in MB" />);
