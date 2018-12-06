import { storiesOf } from '@storybook/react';
import React from 'react';

import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { AvatarIcon, LogoutIcon } from './icon';

storiesOf('Elements / Icons', module)
  .addDecorator(story => <div style={{ background: colors.brand.dark, padding: spaces.medium }}>{story()}</div>)
  .add('LogoutIcon', () => <LogoutIcon size="23px" color={colors.tints.white} />)
  .add('AvatarIcon', () => <AvatarIcon size="32px" color={colors.tints.white} />);
