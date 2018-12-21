import { shallow } from 'enzyme';
import React from 'react';
import { Main } from './main';

describe('Elements', () => {
  describe('Layout', () => {
    it('renders a Main correctly.', () => {
      const component = shallow(<Main />);

      expect(component).toMatchSnapshot();
    });
  });
});
