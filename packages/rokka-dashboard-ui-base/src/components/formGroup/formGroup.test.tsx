import { shallow } from 'enzyme';
import React from 'react';

import { TextInput } from '../../elements';
import { FormGroup } from './formGroup';

describe('Components', () => {
  describe('FormGroup', () => {
    it('renders a form group correctly.', () => {
      const component = shallow(
        <FormGroup label="Label for input">
          <TextInput name="formGroupTest" value="test" onChange={jest.fn()} placeholder="A placeholder" />
        </FormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
