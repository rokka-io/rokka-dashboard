import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Input } from './input';

storiesOf('02 - Elements', module).add('Input', () => (
  <Input placeholder={text('text', 'A placeholder')} disabled={boolean('disabled', false)} />
));
