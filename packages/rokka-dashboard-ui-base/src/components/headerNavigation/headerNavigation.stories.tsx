import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { HeaderNavigation } from './headerNavigation';

storiesOf('Components / Header', module)
  .addDecorator(story => <div style={{ width: '100vw', height: '64px', background: colors.brand.primary }}>{story()}</div>)
  .add('HeaderNavigation', () => <HeaderNavigation username={text('username', 'rokka')} onLogout={action('onLogout')} />);
