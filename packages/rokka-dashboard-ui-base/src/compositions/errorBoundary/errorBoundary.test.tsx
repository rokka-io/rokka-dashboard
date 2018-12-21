import { mount } from 'enzyme';
import React from 'react';

import { ErrorBoundary } from './errorBoundary';

const SomeComponent = () => {
  return <span>SomeComponent's text</span>;
};

describe('Compositions', () => {
  describe('ErrorBoundary', () => {
    it('renders the child if no error happened', () => {
      const component = mount(<ErrorBoundary>test</ErrorBoundary>);

      expect(component).toMatchSnapshot();
    });
    it('renders the error page if an error happened', () => {
      const component = mount(
        <ErrorBoundary>
          <SomeComponent />
        </ErrorBoundary>
      );
      component.find(SomeComponent).simulateError(new Error('an error happened'));

      expect(component).toMatchSnapshot();
    });
  });
});
