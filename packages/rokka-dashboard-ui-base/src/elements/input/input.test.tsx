import { shallow } from 'enzyme';
import React from 'react';

import { Input } from './input';

describe('Elements', () => {
  describe('Input', () => {
    it('renders a input correctly.', () => {
      const component = shallow(<Input value="Test" />);

      expect(component).toMatchSnapshot();
    });
  });
});
