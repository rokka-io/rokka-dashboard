import { shallow } from 'enzyme';
import React from 'react';
import { SearchInput } from './searchInput';

describe('Components', () => {
  describe('SearchInput', () => {
    it('renders a SearchInput component.', () => {
      const tree = shallow(<SearchInput />);

      expect(tree).toMatchSnapshot();
    });
  });
});
