import { shallow } from 'enzyme';
import React from 'react';

import { ParagraphLoginBrand } from './paragraph';

describe('Elements', () => {
  describe('Paragraphs', () => {
    it('renders a login brand paragraph correctly.', () => {
      const component = shallow(<ParagraphLoginBrand>test</ParagraphLoginBrand>);

      expect(component).toMatchSnapshot();
    });
  });
});
