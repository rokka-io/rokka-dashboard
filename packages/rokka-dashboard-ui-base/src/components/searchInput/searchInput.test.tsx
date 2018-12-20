import React from 'react';
import renderer from 'react-test-renderer';
import { SearchInput } from './searchInput';

describe('Components', () => {
  describe('SearchInput', () => {
    it('renders a SearchInput component.', () => {
      const tree = renderer.create(<SearchInput />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
