import { shallow } from 'enzyme';
import React from 'react';

import { ChartSpline } from './chartSpline';

describe('Components', () => {
  describe('Chart', () => {
    it('renders an Chart Spline.', () => {
      const component = shallow(<ChartSpline />);

      expect(component).toMatchSnapshot();
    });
  });
});
