import { shallow } from 'enzyme';
import React from 'react';
import { SearchInput } from './searchInput';

describe('Components', () => {
  describe('SearchInput', () => {
    it('renders a SearchInput component.', () => {
      const onChange = jest.fn();
      const tree = shallow(<SearchInput onChange={onChange} />);

      expect(tree).toMatchSnapshot();
    });
  });
});
