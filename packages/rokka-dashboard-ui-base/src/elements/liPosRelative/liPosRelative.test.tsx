import { shallow } from 'enzyme';
import React from 'react';
import { LiPosRelative } from './liPosRelative';

describe('Elements', () => {
  describe('Sidebar', () => {
    it('renders a LiPosRelative correctly.', () => {
      const component = shallow(<LiPosRelative />);

      expect(component).toMatchSnapshot();
    });
  });
});
