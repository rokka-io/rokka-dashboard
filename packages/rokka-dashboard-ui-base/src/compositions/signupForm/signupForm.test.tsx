import { shallow, mount } from 'enzyme';
import React from 'react';
import { TextInput } from '../../elements';
import { SignupForm } from './signupForm';

describe('Compositions', () => {
  describe('Signup', () => {
    it('renders the signup form correctly.', () => {
      const onSignup = jest.fn();
      const props = { onSignup };

      const component = shallow(<SignupForm {...props} />);

      expect(component).toMatchSnapshot();
    });
    it('calls the onSignup callback with the entered data.', () => {
      const onSignup = jest.fn();
      const props = { onSignup };

      const component = mount(<SignupForm {...props} />);

      const inputs = component.find(TextInput);
      inputs.find('input[name="organization"]').simulate('change', {
        target: {
          name: 'organization',
          type: 'text',
          value: 'an-organization'
        }
      });
      inputs.find('input[name="email"]').simulate('change', {
        target: {
          name: 'email',
          type: 'text',
          value: 'an-email'
        }
      });

      expect(component).toMatchSnapshot();

      const form = component.find('form');
      form.simulate('submit', {
        preventDefault: jest.fn()
      });
      expect(onSignup).toHaveBeenCalledWith('an-organization', 'an-email', expect.any(Function));
    });
  });
});
