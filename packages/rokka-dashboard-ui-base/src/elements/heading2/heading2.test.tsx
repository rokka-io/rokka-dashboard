import { shallow } from 'enzyme';
import React from 'react';

import { colors } from '../../identity/colors/colors';
import { Heading2 } from './heading2';

describe('Elements', () => {
  describe('Heading2', () => {
    it('renders a heading 2 correctly.', () => {
      const component = shallow(<Heading2 color={colors.tints.black}>Heading</Heading2>);

      expect(component).toMatchSnapshot();
    });
  });
});
