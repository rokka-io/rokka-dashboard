import { shallow } from 'enzyme';
import React from 'react';
import { PoweredBy } from './poweredBy';

describe('Components', () => {
  describe('Powered By', () => {
    it('renders a Powered By component.', () => {
      const component = shallow(<PoweredBy />);

      expect(component).toMatchSnapshot();
    });
  });
});
