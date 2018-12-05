import { storiesOf } from '@storybook/react';
import React from 'react';

import { HeaderLogo } from './headerLogo';
import { colors } from '../../identity/colors/colors';

storiesOf('Elements / Images', module)
  .addDecorator(story => <div style={{ background: colors.brand.dark }}>{story()}</div>)
  .add('HeaderLogo', () => <HeaderLogo />);
