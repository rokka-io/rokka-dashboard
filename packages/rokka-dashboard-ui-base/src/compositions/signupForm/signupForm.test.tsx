import { shallow } from 'enzyme';
import React from 'react';
import { LoadingIndicatingButton } from '../../components';
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

      const component = shallow(<SignupForm {...props} />);

      const inputs = component.find(TextInput);
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

      component.find(LoadingIndicatingButton).simulate('click');
      expect(onSignup).toHaveBeenCalledWith('an-organization', 'an-email');
    });
  });
});
