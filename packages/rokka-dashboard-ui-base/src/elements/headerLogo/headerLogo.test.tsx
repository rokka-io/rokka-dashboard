import { shallow } from 'enzyme';
import React from 'react';

import { HeaderLogo } from './headerLogo';

describe('Elements', () => {
  describe('HeaderLogo', () => {
    it('renders the header logo correctly.', () => {
      const component = shallow(<HeaderLogo />);

      expect(component).toMatchSnapshot();
    });
  });
});
