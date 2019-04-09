import { shallow } from 'enzyme';
import React from 'react';

import { ImageTile } from './imageTile';

describe('Components', () => {
  describe('Dashboard', () => {
    it('renders an dashboard chart.', () => {
      const component = shallow(<ImageTile />);

      expect(component).toMatchSnapshot();
    });
  });
});
