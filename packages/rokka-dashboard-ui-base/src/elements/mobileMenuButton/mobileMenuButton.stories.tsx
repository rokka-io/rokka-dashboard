import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { MobileMenuButton } from './mobileMenuButton';

storiesOf('Elements / Header', module)
  .addParameters({
    info: 'The MobileMenuButton is not visible on the desktop viewport, please resize storybook accordingly.'
  })
  .addDecorator(story => <div style={{ background: colors.brand.dark }}>{story()}</div>)
  .add('MobileMenuButton', () => <MobileMenuButton onClick={action('onClick')} active={boolean('active', false)} />);
