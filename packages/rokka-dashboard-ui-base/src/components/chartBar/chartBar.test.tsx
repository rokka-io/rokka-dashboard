import { shallow } from 'enzyme';
import React from 'react';

import { ChartBar } from './chartBar';

describe('Components', () => {
  describe('Chart', () => {
    it('renders an Chart Bar.', () => {
      const component = shallow(<ChartBar />);

      expect(component).toMatchSnapshot();
    });
  });
});
