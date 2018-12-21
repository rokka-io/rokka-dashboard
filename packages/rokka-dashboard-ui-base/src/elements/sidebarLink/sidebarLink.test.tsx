import { shallow } from 'enzyme';
import React from 'react';
import { AddIcon } from '../icon/icon';
import { SidebarLink, SidebarLinkIcon } from './sidebarLink';

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
        <SidebarLink href="#" small={true}>
          Test
        </SidebarLink>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders an active sub SidebarLink correctly.', () => {
      const component = shallow(
        <SidebarLink href="#" small={true} active={true}>
          Test
        </SidebarLink>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders a SidebarLinkIcon correctly.', () => {
      const component = shallow(
        <SidebarLinkIcon href="#">
          <AddIcon />
        </SidebarLinkIcon>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders an active SidebarLinkIcon correctly.', () => {
      const component = shallow(
        <SidebarLinkIcon href="#" active={true}>
          <AddIcon />
        </SidebarLinkIcon>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
