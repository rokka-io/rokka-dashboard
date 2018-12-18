import { shallow } from 'enzyme';
import React from 'react';
import { Button } from '../../elements';
import { HeaderNavigation } from './headerNavigation';

describe('Components', () => {
  describe('HeaderNavigation', () => {
    it('renders the headernavigation correctly', () => {
      const onLogout = jest.fn();
      const component = shallow(<HeaderNavigation username="test" onLogout={onLogout} />);

      component.find(Button).simulate('click');

      expect(component).toMatchSnapshot();
      expect(onLogout).toHaveBeenCalledTimes(1);
    });
  });
});
