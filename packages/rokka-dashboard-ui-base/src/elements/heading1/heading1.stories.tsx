import { color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { colors } from '../../identity/colors/colors';
import { Heading1 } from './heading1';

storiesOf('Elements / Headings', module).add('Heading 1', () => (
  <Heading1 color={color('Color', colors.tints.black)}>{text('text', 'A Heading')}</Heading1>
));
