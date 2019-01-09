import { shallow } from 'enzyme';
import React from 'react';
import { Navigation } from './Navigation';

describe('Compositions', () => {
  describe('Navigation', () => {
    it('renders the Navigation correctly.', () => {
      const component = shallow(<Navigation />);

      expect(component).toMatchSnapshot();
    });
  });
});
