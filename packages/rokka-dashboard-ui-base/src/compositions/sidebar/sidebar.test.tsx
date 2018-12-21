import { shallow } from 'enzyme';
import React from 'react';

import { SidebarLink } from '../../elements/sidebarLink/sidebarLink';
import { Sidebar } from './sidebar';

describe('Compositions', () => {
  describe('Sidebar', () => {
    it('renders a sidebar correctly.', () => {
      const component = shallow(
        <Sidebar>
          <li>
            <SidebarLink>Test</SidebarLink>
          </li>
        </Sidebar>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders an active sidebar correctly', () => {
      const component = shallow(
        <Sidebar active={true}>
          <li>
            <SidebarLink>Test</SidebarLink>
          </li>
        </Sidebar>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
