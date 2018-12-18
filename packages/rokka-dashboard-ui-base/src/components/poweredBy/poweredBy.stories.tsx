import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { PoweredBy } from './poweredBy';

storiesOf('Components / Sidebar', module)
  .addDecorator(story => (
    <div style={{ width: '100vw', height: '64px', padding: '10px', background: colors.gray.sidebar, position: 'relative' }}>
      {story()}
    </div>
  ))
  .add('PoweredBy', () => <PoweredBy />);
