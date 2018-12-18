import { shallow } from 'enzyme';
import React from 'react';

import { MobileMenuButton } from '../../elements/mobileMenuButton/mobileMenuButton';
import { Header } from './header';

describe('Compositions', () => {
  describe('Header', () => {
    it('renders the header correctly.', () => {
      const onLogout = jest.fn();
      const onToggleMenu = jest.fn();
      const component = shallow(<Header username="rokka-test" onLogout={onLogout} onToggleMenu={onToggleMenu} />);
      const beforeState = component.state();
      expect(beforeState).toStrictEqual({ menuActive: false });

      component.find(MobileMenuButton).simulate('click');

      expect(component).toMatchSnapshot();
      expect(onToggleMenu).toHaveBeenCalledTimes(1);

      const afterState = component.state();
      expect(afterState).toStrictEqual({ menuActive: true });
    });
  });
});
