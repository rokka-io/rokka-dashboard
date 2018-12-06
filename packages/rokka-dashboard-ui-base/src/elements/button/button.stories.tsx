import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button } from './button';

storiesOf('Elements / Forms', module).add('Button', () => (
  <Button onClick={action('Button Click')} disabled={boolean('disabled', false)}>
    {text('text', 'foobar')}
  </Button>
));
