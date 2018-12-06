import { shallow } from 'enzyme';
import React from 'react';

import { LoadingIndicatingButton } from '../../components/loadingIndicatingButton/loadingIndicatingButton';
import { Input } from '../../elements/input/input';
import { Login } from './login';

describe('Compositions', () => {
  describe('Login', () => {
    it('renders the login form correctly.', () => {
      const onLogin = jest.fn();
      const props = { onLogin };

      const component = shallow(<Login {...props} />);

      expect(component).toMatchSnapshot();
    });
    it('calls the onLogin callback with the entered data.', () => {
      const onLogin = (organization: string, password: string) => {
        expect(organization).toBe('an-organization');
        expect(password).toBe('a password');
      };
      const props = { onLogin };

      const component = shallow(<Login {...props} />);

      const inputs = component.find(Input);
      inputs.find('[type="text"]').simulate('change', {
        target: {
          name: 'organization',
          type: 'text',
          value: 'an-organization'
        }
      });
      inputs.find('[type="password"]').simulate('change', {
        target: {
          name: 'apiKey',
          type: 'password',
          value: 'a password'
        }
      });

      expect(component).toMatchSnapshot();

      component.find(LoadingIndicatingButton).simulate('click');
    });
  });
});
