import { shallow } from 'enzyme';
import React from 'react';

import { DashboardStat } from './dashboardStat';

describe('Components', () => {
  describe('Dashboard', () => {
    it('renders an dashboard statistic.', () => {
      const component = shallow(<DashboardStat />);

      expect(component).toMatchSnapshot();
    });
  });
});
