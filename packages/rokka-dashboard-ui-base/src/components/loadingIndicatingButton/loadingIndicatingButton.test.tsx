import { mount, shallow } from 'enzyme';
import React from 'react';
import { LoadingIndicatingButton } from './loadingIndicatingButton';

describe('Components', () => {
  describe('LoadingIndicatingButton', () => {
    it('renders a button with a loading indicator correctly.', () => {
      const component = shallow(<LoadingIndicatingButton loading={true}>test</LoadingIndicatingButton>);

      expect(component).toMatchSnapshot();
    });
    it('disables onClick when loading is true.', () => {
      const spy = jest.fn();
      const component = mount(
        <LoadingIndicatingButton onClick={spy} loading={true}>
          test
        </LoadingIndicatingButton>
      );

      component.simulate('click');

      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('renders a normal button if loading is false, correctly.', () => {
      const spy = jest.fn();
      const component = shallow(<LoadingIndicatingButton onClick={spy}>test</LoadingIndicatingButton>);

      component.simulate('click');

      expect(component).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
