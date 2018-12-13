import { mount } from 'enzyme';
import React from 'react';
import { GlobalStyle } from './globalStyle';

describe('Elements', () => {
  describe('GlobalStyle', () => {
    it('renders the global style correctly.', () => {
      const component = mount(<GlobalStyle />);

      expect(component).toMatchSnapshot();
    });
  });
});
