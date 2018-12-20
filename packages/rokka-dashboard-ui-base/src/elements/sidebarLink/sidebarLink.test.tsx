import { shallow } from 'enzyme';
import React from 'react';
import { SidebarLink } from './sidebarLink';

describe('Elements', () => {
  describe('Sidebar', () => {
    it('renders a SidebarLink correctly.', () => {
      const component = shallow(<SidebarLink href="#">Test</SidebarLink>);

      expect(component).toMatchSnapshot();
    });
    it('renders an active SidebarLink correctly.', () => {
      const component = shallow(
        <SidebarLink href="#" active={true}>
          Test
        </SidebarLink>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders a sub SidebarLink correctly.', () => {
      const component = shallow(
        <SidebarLink href="#" sub={true}>
          Test
        </SidebarLink>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders an active sub SidebarLink correctly.', () => {
      const component = shallow(
        <SidebarLink href="#" sub={true} active={true}>
          Test
        </SidebarLink>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
