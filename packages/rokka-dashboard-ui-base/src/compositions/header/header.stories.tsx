import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Header } from './header';

storiesOf('Compositions', module)
  .addDecorator(story => <div style={{ width: '100vw', height: '64px' }}>{story()}</div>)
  .addParameters({
    info: 'The MobileMenuButton is not visible on the desktop viewport, please resize storybook accordingly.'
  })
  .add('Header', () => (
    <Header username={text('username', 'rokka')} onLogout={action('logout')} onToggleMenu={action('toggle menu')} />
  ));
