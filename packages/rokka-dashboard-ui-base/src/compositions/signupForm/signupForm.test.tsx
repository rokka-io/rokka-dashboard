import { shallow } from 'enzyme';
import React from 'react';

import { LoadingIndicatingButton } from '../../components/loadingIndicatingButton/loadingIndicatingButton';
import { Input } from '../../elements/input/input';
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
      const onSignup = (organization: string, email: string) => {
        expect(organization).toBe('an-organization');
        expect(email).toBe('an-email');
      };
      const props = { onSignup };

      const component = shallow(<SignupForm {...props} />);

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

      component.find(LoadingIndicatingButton).simulate('click');
    });
  });
});
