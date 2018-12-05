import { shallow } from 'enzyme';
import React from 'react';

import { ParagraphLoginBrand, ParagraphWhite } from './paragraph';

describe('Elements', () => {
  describe('Paragraphs', () => {
    it('renders a login brand paragraph correctly.', () => {
      const component = shallow(<ParagraphLoginBrand>test</ParagraphLoginBrand>);

      expect(component).toMatchSnapshot();
    });
    it('renders a white paragraph correctly.', () => {
      const component = shallow(<ParagraphWhite>test</ParagraphWhite>);

      expect(component).toMatchSnapshot();
    });
  });
});
