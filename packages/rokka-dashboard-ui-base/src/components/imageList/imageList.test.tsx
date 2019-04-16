import { shallow } from 'enzyme';
import React from 'react';

import { ImageList } from './imageList';

describe('Components', () => {
  describe('Dashboard', () => {
    it('renders an dashboard chart.', () => {
      const component = shallow(<ImageList />);

      expect(component).toMatchSnapshot();
    });
  });
});
