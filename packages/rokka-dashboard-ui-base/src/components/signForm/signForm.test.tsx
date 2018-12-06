import { shallow } from 'enzyme';
import React from 'react';

import { SignForm } from './signForm';

describe('Components', () => {
  describe('FormGroup', () => {
    it('renders a sign form group correctly.', () => {
      const component = shallow(
        <SignForm isLogin={true} marketingText="randomText">
          <div>Right column content</div>
        </SignForm>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
