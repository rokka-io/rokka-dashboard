import { shallow } from 'enzyme';
import React from 'react';

import { Spinner } from './spinner';

describe('Elements', () => {
  describe('ActivityIndicators', () => {
    it('renders a spinner correctly.', () => {
      const component = shallow(<Spinner />);

      expect(component).toMatchSnapshot();
    });
    it('renders a small spinner correctly.', () => {
      const component = shallow(<Spinner small={true} />);

      expect(component).toMatchSnapshot();
    });
    it('renders a white spinner correctly.', () => {
      const component = shallow(<Spinner backgroundColor="#fff" />);

      expect(component).toMatchSnapshot();
    });
  });
});
