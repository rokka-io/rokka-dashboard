import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { User } from './user';

storiesOf('Components / Navigation', module)
  .addDecorator(story => (
    <div style={{ width: '100vw', height: '50px', padding: '10px', background: colors.brand.primary }}>{story()}</div>
  ))
  .add('User', () => <User username="rokka-dashboard" />);
