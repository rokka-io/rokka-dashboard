import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { SearchInput } from './searchInput';

storiesOf('Components / Sidebar', module)
  .addDecorator(story => (
    <div style={{ width: '220px', height: '64px', padding: '10px', background: colors.gray.sidebar, position: 'relative' }}>
      {story()}
    </div>
  ))
  .add('SearchInput', () => <SearchInput />);
