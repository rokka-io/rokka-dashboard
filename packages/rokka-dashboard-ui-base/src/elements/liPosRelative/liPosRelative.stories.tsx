import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { LiPosRelative } from './liPosRelative';

storiesOf('Elements / Sidebar', module)
  .addDecorator(story => <div style={{ background: colors.brand.dark }}>{story()}</div>)
  .add('LiPosRelative', () => (
    <ul>
      <LiPosRelative>Li pos relative</LiPosRelative>
    </ul>
  ));
