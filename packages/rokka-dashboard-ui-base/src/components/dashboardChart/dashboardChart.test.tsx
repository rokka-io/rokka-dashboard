import { shallow } from 'enzyme';
import React from 'react';

import { DashboardChart } from './dashboardChart';

describe('Components', () => {
  describe('Dashboard', () => {
    it('renders an dashboard chart.', () => {
      const component = shallow(<DashboardChart />);

      expect(component).toMatchSnapshot();
    });
  });
});
