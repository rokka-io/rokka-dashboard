import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { SearchInput } from '../../components';
import { AddIcon, LiPosRelative, ShowOnActive, SidebarLink, SidebarLinkIcon } from '../../elements';
import { SidebarStacksList } from '../../elements/sidebarStacksList/sidebarStacksList';
import { Sidebar } from './sidebar';

storiesOf('Compositions', module)
  .addDecorator(story => <div style={{ minHeight: '100vh', transform: 'translate(0)' }}>{story()}</div>)
  .add('Sidebar', () => (
    <Sidebar active={boolean('active', false)}>
      <li>
        <SidebarLink>Test</SidebarLink>
      </li>
      <LiPosRelative>
        <SidebarLink>Stacks</SidebarLink>
        <SidebarLinkIcon>
          <AddIcon height="24px" width="24px" />
        </SidebarLinkIcon>
        <ShowOnActive active={boolean('stacks list active', true)}>
          <SearchInput onChange={action('onChange')} placeholder={text('placeholder', 'Search...')} />
          <SidebarStacksList>
            <li>
              <SidebarLink small={true}>A stack</SidebarLink>
            </li>
            <li>
              <SidebarLink small={true}>2nd stack</SidebarLink>
            </li>
          </SidebarStacksList>
        </ShowOnActive>
      </LiPosRelative>
    </Sidebar>
  ));
