import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Tile } from './tile';

storiesOf('Elements / Tile', module).add('Default', () => (
  <Tile>
    {text('text', 'foobar')}
  </Tile>
));

storiesOf('Elements / Tile', module).add('Short', () => (
  <Tile minHeight='short'>
    {text('text', 'foobar')}
  </Tile>
));

storiesOf('Elements / Tile', module).add('Tall', () => (
  <Tile minHeight='tall'>
    {text('text', 'foobar')}
  </Tile>
));

