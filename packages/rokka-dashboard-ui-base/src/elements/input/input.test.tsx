import { mount } from 'enzyme';
import React from 'react';

import { BooleanInput, NumberInput, TextInput } from './input';

describe('Elements', () => {
  describe('Input', () => {
    it('renders a TextInput correctly.', () => {
      const onChange = jest.fn();
      const component = mount(<TextInput name="testname" value="Test" onChange={onChange} />);

      expect(component).toMatchSnapshot();

      component.find('input').simulate('change', {
        target: {
          name: 'testname',
          value: 'another test'
        }
      });

      expect(onChange).toHaveBeenCalledWith('testname', 'another test');
    });
    it('renders a BooleanInput correctly.', () => {
      const onChange = jest.fn();
      const component = mount(<BooleanInput name="testname" value={true} onChange={onChange} />);

      expect(component).toMatchSnapshot();

      component.find('input').simulate('change', {
        target: {
          name: 'testname',
          checked: false
        }
      });

      expect(onChange).toHaveBeenCalledWith('testname', false);
    });

    it('renders a NumberInput correctly.', () => {
      const onChange = jest.fn();
      const component = mount(<NumberInput name="testname" value={10} onChange={onChange} />);

      expect(component).toMatchSnapshot();

      component.find('input').simulate('change', {
        target: {
          name: 'testname',
          value: '20'
        }
      });

      expect(onChange).toHaveBeenCalledWith('testname', 20);
    });
  });
});
