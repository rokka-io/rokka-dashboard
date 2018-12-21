import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ShowOnActive } from './showOnActive';

storiesOf('Elements / Display', module).add('ShowOnActive', () => (
  <ShowOnActive active={boolean('active', true)} activeDisplay={text('display value', 'block')}>
    This is some react node
  </ShowOnActive>
));
