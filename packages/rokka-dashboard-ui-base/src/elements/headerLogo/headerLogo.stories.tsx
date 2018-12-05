import { storiesOf } from '@storybook/react';
import React from 'react';

import { colors } from '../../identity/colors/colors';
import { HeaderLogo } from './headerLogo';

storiesOf('Elements / Images', module)
  .addDecorator(story => <div style={{ background: colors.brand.dark }}>{story()}</div>)
  .add('HeaderLogo', () => <HeaderLogo />);
