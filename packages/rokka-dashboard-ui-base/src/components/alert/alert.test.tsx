import { shallow } from 'enzyme';
import React from 'react';

import { Alert, AlertType } from './alert';

describe('Elements', () => {
  describe('Alert', () => {
    it('renders null without an alert.', () => {
      const component = shallow(<Alert />);

      expect(component).toMatchSnapshot();
    });
    it('renders an alert correctly.', () => {
      const alert = {
        message: 'An alert',
        type: AlertType.Info
      };
      const component = shallow(<Alert alert={alert} />);

      expect(component).toMatchSnapshot();
    });
    it('renders an array of alerts correctly.', () => {
      const alert = {
        message: ['An alert', 'Yoolo', 'Foobar'],
        type: AlertType.Info
      };
      const component = shallow(<Alert alert={alert} />);

      expect(component).toMatchSnapshot();
    });
  });
});
