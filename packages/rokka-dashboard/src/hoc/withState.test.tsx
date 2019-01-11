import { mount } from 'enzyme';
import React from 'react';
import { testSubscriberCount, toggleSidebar } from '../state';
import { withState } from './withState';

describe('Higher-Order-Components', () => {
  describe('withState', () => {
    it('should forward the current global state as props to the component', () => {
      const Content = () => <div>some component</div>;
      const Comp = withState(Content);
      const component = mount(<Comp />);

      expect(component).toMatchSnapshot();

      expect(component.find(Content).props()).toStrictEqual({
        showSidebar: false
      });
    });
    it('should subscribe to state updates', () => {
      const Content = () => <div>some component</div>;
      const Comp = withState(Content);

      const component = mount(<Comp />);

      expect(component.find(Content).props()).toStrictEqual({
        showSidebar: false
      });

      toggleSidebar();

      // until setCompState is through and the component is re-rendered we need to wait
      // a setTimeout with 0 should help that wait time.
      setTimeout(() => {
        expect(component.find(Content).props()).toStrictEqual({
          showSidebar: true
        });
      }, 0);

      component.unmount();

      toggleSidebar();

      // after unmount unsubscribe() should be called and therefore the component should not receive any state
      // updates anymore.
      setTimeout(() => {
        expect(testSubscriberCount()).toBe(0);
        expect(component.find(Content).props()).toStrictEqual({
          showSidebar: true
        });
      }, 0);
    });
  });
});
