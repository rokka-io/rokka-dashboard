import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { SearchInput } from '../../components';
import { AddIcon, LiPosRelative, ShowOnActive, SidebarLink, SidebarLinkIcon } from '../../elements';
import { SidebarStacksList } from '../../elements';
import { Sidebar } from './sidebar';

storiesOf('Compositions', module)
  .addDecorator(story => (
    <Router>
      <div style={{ minHeight: '100vh', transform: 'translate(0)' }}>{story()}</div>
    </Router>
  ))
  .add('Sidebar', () => (
    <Sidebar active={boolean('active', false)}>
      <li>
        <SidebarLink to="#">Test</SidebarLink>
      </li>
      <LiPosRelative>
        <SidebarLink to="#">Stacks</SidebarLink>
        <SidebarLinkIcon to="#">
          <AddIcon height="24px" width="24px" />
        </SidebarLinkIcon>
        <ShowOnActive active={boolean('stacks list active', true)}>
          <SearchInput value="" onChange={action('onChange')} placeholder={text('placeholder', 'Search...')} />
          <SidebarStacksList>
            <li>
              <SidebarLink to="#" small={true}>
                A stack
              </SidebarLink>
            </li>
            <li>
              <SidebarLink to="#" small={true}>
                2nd stack
              </SidebarLink>
            </li>
          </SidebarStacksList>
        </ShowOnActive>
      </LiPosRelative>
    </Sidebar>
  ));
