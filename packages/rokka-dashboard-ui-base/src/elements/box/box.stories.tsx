import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Box } from './box';

storiesOf('Elements / Box', module).add('Default', () => (
  <Box>
    {text('text', 'foobar')}
  </Box>
));

storiesOf('Elements / Box', module).add('Short', () => (
  <Box height='short'>
    {text('text', 'foobar')}
  </Box>
));
