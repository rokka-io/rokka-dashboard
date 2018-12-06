import { shallow } from 'enzyme';
import React from 'react';

import { AvatarIcon, LogoutIcon } from './icon';

describe('Elements', () => {
  describe('Icon', () => {
    it('renders the avatar icon correctly.', () => {
      const component = shallow(<AvatarIcon />);

      expect(component).toMatchSnapshot();
    });
    it('renders the logout icon correctly.', () => {
      const component = shallow(<LogoutIcon />);

      expect(component).toMatchSnapshot();
    });
  });
});
