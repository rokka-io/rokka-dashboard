import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button } from './button';

storiesOf('02 - Elements', module).add('Button', () => (
  <Button onClick={action('Button Click')}>{text('text', 'foobar')}</Button>
));
