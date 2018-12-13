import { shallow } from 'enzyme';
import React from 'react';
import { MobileMenuButton } from './mobileMenuButton';

describe('Elements', () => {
  describe('Header', () => {
    it('renders a MobileMenuButton correctly.', () => {
      const spy = jest.fn();
      const component = shallow(<MobileMenuButton onClick={spy} />);

      component.simulate('click');

      expect(component).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('renders an active MobileMenuButton correctly.', () => {
      const spy = jest.fn();
      const component = shallow(<MobileMenuButton active={true} onClick={spy} />);

      component.simulate('click');

      expect(component).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
