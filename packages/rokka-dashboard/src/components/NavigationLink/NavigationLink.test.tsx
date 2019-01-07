import { shallow } from 'enzyme';
import React from 'react';
import { NavigationLink } from './NavigationLink';

describe('Components', () => {
  describe('NavigationLink', () => {
    it('renders a NavigationLink correctly.', () => {
      const component = shallow(<NavigationLink path="/test" name="Test" />);

      expect(component).toMatchSnapshot();
    });
    it('renders a NavigationLink correctly with all props.', () => {
      const component = shallow(<NavigationLink path="/test" name="Test" exact={true} />);

      expect(component).toMatchSnapshot();
    });
  });
});
