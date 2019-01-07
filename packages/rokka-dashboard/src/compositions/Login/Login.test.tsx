import { mount } from 'enzyme';
import React from 'react';
import { Login } from './Login';

describe('Compositions', () => {
  describe('Login', () => {
    it('renders the Login composition correctly.', () => {
      const component = mount(<Login />);

      expect(component).toMatchSnapshot();
    });
  });
});
