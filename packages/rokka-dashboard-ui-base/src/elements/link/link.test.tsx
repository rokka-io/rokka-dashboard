import { shallow } from 'enzyme';
import React from 'react';

import { Link } from './link';

describe('Elements', () => {
  describe('Link', () => {
    it('renders a link correctly.', () => {
      const component = shallow(<Link>test</Link>);

      expect(component).toMatchSnapshot();
    });
  });
});
