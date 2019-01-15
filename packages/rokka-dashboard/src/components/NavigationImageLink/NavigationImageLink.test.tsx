import { shallow } from 'enzyme';
import React from 'react';
import { AddIcon } from 'rokka-dashboard-ui-base';
import { NavigationImageLink } from './NavigationImageLink';

describe('Components', () => {
  describe('NavigationImageLink', () => {
    it('renders a NavigationImageLink correctly.', () => {
      const component = shallow(<NavigationImageLink path="/test" icon={<AddIcon />} />);

      expect(component).toMatchSnapshot();
    });
    it('renders a NavigationImageLink correctly with all props.', () => {
      const component = shallow(<NavigationImageLink path="/test" exact={true} icon={<AddIcon />} />);

      expect(component).toMatchSnapshot();
    });
  });
});
