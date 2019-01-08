import { mount, shallow } from 'enzyme';
import { LocationDescriptor } from 'history';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppUser } from '../../state';
import { BaseLayout } from './BaseLayout';

describe('Compositions', () => {
  describe('BaseLayout', () => {
    it('renders the BaseLayout layout correctly.', () => {
      const user: AppUser = {
        organization: 'test',
        apiKey: 'test'
      };
      const component = shallow(
        <BaseLayout user={user} showSidebar={false}>
          Test
        </BaseLayout>
      );

      expect(component).toMatchSnapshot();
    });
    it('renders the BaseLayout layout correctly with a sidebar.', () => {
      const user: AppUser = {
        organization: 'test',
        apiKey: 'test'
      };
      const component = shallow(
        <BaseLayout user={user} showSidebar={true}>
          Test
        </BaseLayout>
      );

      expect(component).toMatchSnapshot();
    });
    it('should show an error when the child is erroring', () => {
      const user: AppUser = {
        organization: 'test',
        apiKey: 'test'
      };
      const ErrorComponent = () => <span>Test</span>;
      const entries: LocationDescriptor[] = [{ pathname: '/', key: 'testKey' }];
      const component = mount(
        <Router initialEntries={entries}>
          <BaseLayout user={user} showSidebar={true}>
            <ErrorComponent />
          </BaseLayout>
        </Router>
      );
      const error = new Error('I am an error');
      component.find(ErrorComponent).simulateError(error);

      expect(component).toMatchSnapshot();
    });
  });
});
