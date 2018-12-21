import { shallow } from 'enzyme';
import React from 'react';

import { ShowOnActive } from './showOnActive';

describe('Elements', () => {
  describe('ShowOnActive', () => {
    it('renders a ShowOnActive item.', () => {
      const component = shallow(<ShowOnActive>Test</ShowOnActive>);

      expect(component).toMatchSnapshot();
    });
  });
});
