import { shallow } from 'enzyme';
import React from 'react';

import { colors } from '../../identity/colors/colors';
import { Heading1 } from './heading1';

describe('Elements', () => {
  describe('Heading1', () => {
    it('renders a heading 1 correctly.', () => {
      const component = shallow(<Heading1 color={colors.tints.black}>Heading</Heading1>);

      expect(component).toMatchSnapshot();
    });
  });
});
