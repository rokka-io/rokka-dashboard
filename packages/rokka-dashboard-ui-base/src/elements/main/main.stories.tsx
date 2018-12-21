import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { Main } from './main';

storiesOf('Elements / Layout', module)
  .addDecorator(story => <div style={{ background: colors.brand.dark, height: '50vh' }}>{story()}</div>)
  .add('Main', () => <Main style={{ background: colors.gray.light, height: '50vh' }}>Main content goes here</Main>);
