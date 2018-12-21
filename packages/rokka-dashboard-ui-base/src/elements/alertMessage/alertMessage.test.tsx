import { shallow } from 'enzyme';
import React from 'react';

import { AlertMessage } from './alertMessage';

describe('Elements', () => {
  describe('AlertMessage', () => {
    it('renders a alert message correctly.', () => {
      const component = shallow(<AlertMessage>test</AlertMessage>);

      expect(component).toMatchSnapshot();
    });
  });
});
