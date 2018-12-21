import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { colors } from '../../identity/colors/colors';
import { SidebarStacksList } from './sidebarStacksList';

storiesOf('Elements / Sidebar', module)
  .addDecorator(story => (
    <div
      style={{
        position: 'relative',
        background: colors.gray.sidebar,
        width: '200px',
        height: '100%',
        color: colors.tints.white
      }}
    >
      {story()}
    </div>
  ))
  .add('SidebarStacksList', () => (
    <SidebarStacksList style={{ border: '3px dashed red' }}>{text('text', 'Some text')}</SidebarStacksList>
  ));
