import { mount } from 'enzyme';
import React from 'react';
import { SearchInput } from './searchInput';

describe('Components', () => {
  describe('SearchInput', () => {
    it('renders a SearchInput component.', () => {
      const onChange = jest.fn();
      const tree = mount(<SearchInput value="" onChange={onChange} />);

      expect(tree).toMatchSnapshot();

      tree.find('input').simulate('change', {
        target: {
          name: 'testname',
          value: 'testvalue'
        }
      });

      expect(onChange).toHaveBeenCalledWith('searchInput', 'testvalue');
    });
  });
});
