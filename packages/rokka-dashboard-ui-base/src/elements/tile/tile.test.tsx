import { shallow } from 'enzyme';
import React from 'react';

import { Tile } from './tile';

describe('Elements', () => {
  describe('Tile', () => {
    it('renders a Tile element.', () => {
      const component = shallow(<Tile>Test</Tile>);

      expect(component).toMatchSnapshot();
    });
  });
});
