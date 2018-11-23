import { text, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Heading2 } from './heading2';
import { colors } from '../../identity/colors/colors';

storiesOf('Elements / Headings', module).add('Heading 2', () => (
  <Heading2 color={color('Color', colors.tints.black)}>{text('text', 'A label')}</Heading2>
));
