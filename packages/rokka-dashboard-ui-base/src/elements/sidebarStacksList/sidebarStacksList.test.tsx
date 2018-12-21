import { shallow } from 'enzyme';
import React from 'react';
import { SidebarStacksList } from './sidebarStacksList';

describe('Elements', () => {
  describe('Sidebar', () => {
    it('renders a SidebarStacksList correctly.', () => {
      const component = shallow(<SidebarStacksList />);

      expect(component).toMatchSnapshot();
    });
  });
});
