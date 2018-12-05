import { shallow } from 'enzyme';
import React from 'react';

import { Label } from './label';

describe('Elements', () => {
  describe('Label', () => {
    it('renders a label correctly.', () => {
      const component = shallow(<Label>test</Label>);

      expect(component).toMatchSnapshot();
    });
  });
});
