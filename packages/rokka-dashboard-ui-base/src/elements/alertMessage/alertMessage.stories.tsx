import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { AlertMessage } from './alertMessage';

storiesOf('Elements / Alert', module).add('AlertMessage', () => (
  <AlertMessage>{text('text', 'An alert message')}</AlertMessage>
));
