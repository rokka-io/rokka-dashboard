import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Alert, AlertType } from './alert';

const keys = Object.keys(AlertType).filter(item => isNaN(parseInt(item, 10)));

storiesOf('Components / Alert', module).add('Alert', () => (
  <Alert
    alert={{
      message: text('alert message', 'Some alert'),
      type: AlertType[select('type', keys, keys[0])]
    }}
  />
));
