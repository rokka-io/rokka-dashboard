import { shallow } from 'enzyme';
import React from 'react';

import { ErrorPage } from './errorPage';

describe('Components', () => {
  describe('Error', () => {
    it('renders an error information correctly.', () => {
      const component = shallow(<ErrorPage />);

      expect(component).toMatchSnapshot();
    });
  });
});
