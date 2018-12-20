import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { SidebarLink } from './sidebarLink';

storiesOf('Elements / Sidebar', module)
  .addDecorator(story => <div style={{ background: colors.gray.sidebar }}>{story()}</div>)
  .add('SidebarLink', () => (
    <SidebarLink href="#" active={boolean('active', false)} sub={boolean('sub', false)}>
      {text('text', 'Home')}
    </SidebarLink>
  ));
