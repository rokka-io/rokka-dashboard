import { shallow } from 'enzyme';
import React from 'react';
import { allIcons } from './icon';

describe('Elements', () => {
  describe('Icon', () => {
    for (const iconName of Object.keys(allIcons)) {
      it(`renders the ${iconName} correctly.`, () => {
        const Icon = allIcons[iconName];
        const component = shallow(<Icon />);

        expect(component).toMatchSnapshot();
      });
    }
  });
});
