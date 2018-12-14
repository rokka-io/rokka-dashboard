import { shallow } from 'enzyme';
import React from 'react';

import { Input } from '../../elements';
import { FormGroup } from './formGroup';

describe('Components', () => {
  describe('FormGroup', () => {
    it('renders a form group correctly.', () => {
      const component = shallow(
        <FormGroup label="Label for input">
          <Input placeholder="A placeholder" />
        </FormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
