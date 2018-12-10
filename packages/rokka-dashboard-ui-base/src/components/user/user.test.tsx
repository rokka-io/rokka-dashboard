import { shallow } from 'enzyme';
import React from 'react';

import { User } from './user';

describe('Components', () => {
  describe('User', () => {
    it('renders a user correctly.', () => {
      const component = shallow(<User username="rokka-test" />);

      expect(component).toMatchSnapshot();
    });
  });
});
