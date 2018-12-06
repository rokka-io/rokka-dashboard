import { shallow } from 'enzyme';
import React from 'react';

import { Button } from './button';

describe('Elements', () => {
  describe('Button', () => {
    it('renders a button correctly.', () => {
      const spy = jest.fn();
      const component = shallow(<Button onClick={spy}>test</Button>);

      component.simulate('click');

      expect(component).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('renders a disabled button correctly and does not call onClick.', () => {
      const spy = jest.fn();
      const component = shallow(
        <Button disabled={true} onClick={spy}>
          test
        </Button>
      );

      component.simulate('click');

      expect(component).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
