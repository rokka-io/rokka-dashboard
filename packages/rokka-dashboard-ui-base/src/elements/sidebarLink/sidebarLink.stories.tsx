import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { colors } from '../../identity/colors/colors';
import { AddIcon } from '../icon/icon';
import { SidebarLink, SidebarLinkIcon } from './sidebarLink';

storiesOf('Elements / Sidebar', module)
  .addDecorator(story => (
    <div style={{ position: 'relative', background: colors.gray.sidebar, height: '55px' }}>{story()}</div>
  ))
  .add('SidebarLink', () => (
    <SidebarLink href="#" active={boolean('active', false)} sub={boolean('sub', false)}>
      {text('text', 'Home')}
    </SidebarLink>
  ))
  .add('SidebarLinkIcon', () => (
    <>
      <SidebarLink href="#" active={boolean('active', false)} sub={boolean('sub', false)}>
        {text('text', 'New stack')}
      </SidebarLink>
      <SidebarLinkIcon href="#" active={boolean('active', false)} sub={boolean('sub', false)}>
        <AddIcon height="24px" width="24px" />
      </SidebarLinkIcon>
    </>
  ));
