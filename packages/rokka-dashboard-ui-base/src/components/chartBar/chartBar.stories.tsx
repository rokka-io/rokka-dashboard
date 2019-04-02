import { storiesOf } from '@storybook/react';
import React from 'react';

import { ChartBar } from './chartBar';

storiesOf('Components / Chart', module).add('Bar', () => <ChartBar stat="190 MB" label="Traffic" />);
