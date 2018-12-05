import { storiesOf } from '@storybook/react';
import React from 'react';

import { HeaderLogo } from './headerLogo';
import { colors } from '../../identity/colors/colors';

storiesOf('Elements / Images', module).add('HeaderLogo', () => (
  <div style={{ background: colors.brand.dark }}>
    <HeaderLogo />
  </div>
));
