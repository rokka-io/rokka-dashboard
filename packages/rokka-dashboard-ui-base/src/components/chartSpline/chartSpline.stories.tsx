import { storiesOf } from '@storybook/react';
import React from 'react';

import { ChartSpline } from './chartSpline';

storiesOf('Components / Chart', module).add('Spline', () => <ChartSpline stat="190 MB" label="Traffic" />);
