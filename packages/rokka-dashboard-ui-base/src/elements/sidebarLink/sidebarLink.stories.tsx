import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { colors } from '../../identity/colors/colors';
import { AddIcon } from '../icon/icon';
import { SidebarLink, SidebarLinkIcon } from './sidebarLink';

storiesOf('Elements / Sidebar', module)
  .addDecorator(story => (
    <Router>
      <div style={{ position: 'relative', background: colors.gray.sidebar, height: '55px' }}>{story()}</div>
    </Router>
  ))
  .add('SidebarLink', () => (
    <SidebarLink to="#" active={boolean('active', false)} small={boolean('small', false)}>
      {text('text', 'Home')}
    </SidebarLink>
  ))
  .add('SidebarLinkIcon', () => (
    <>
      <SidebarLink to="#" active={boolean('active', false)} small={boolean('small', false)}>
        {text('text', 'New stack')}
      </SidebarLink>
      <SidebarLinkIcon to="#" active={boolean('active', false)} small={boolean('small', false)}>
        <AddIcon height="24px" width="24px" />
      </SidebarLinkIcon>
    </>
  ));
