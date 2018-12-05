import { shallow } from 'enzyme';
import React from 'react';

import { Signup } from './signup';
import { Button } from '../../elements/button/button';
import { Input } from '../../elements/input/input';

describe('Compositions', () => {
  describe('Signup', () => {
    it('renders the signup form correctly.', () => {
      const onSignup = jest.fn();
      const props = { onSignup };

      const component = shallow(<Signup {...props} />);

      expect(component).toMatchSnapshot();
    });
    it('calls the onSignup callback with the entered data.', () => {
      const onSignup = (organization: string, email: string) => {
        expect(organization).toBe('an-organization');
        expect(email).toBe('an-email');
      };
      const props = { onSignup };

      const component = shallow(<Signup {...props} />);

      const inputs = component.find(Input);
      inputs.find('[type="text"]').simulate('change', {
        target: {
          name: 'organization',
          type: 'text',
          value: 'an-organization'
        }
      });
      inputs.find('[type="text"]').simulate('change', {
        target: {
          name: 'email',
          type: 'text',
          value: 'an-email'
        }
      });

      expect(component).toMatchSnapshot();

      component.find(Button).simulate('click');
    });
  });
});
