import React from 'react';
import renderer from 'react-test-renderer';
import { withAuthRequired } from './withAuthRequired';

describe('Higher-Order-Components', () => {
  describe('withAuthRequired', () => {
    it('should render the login component if user is not set', () => {
      const Comp = withAuthRequired(() => <div>Should not be rendered</div>);
      const component = renderer.create(<Comp />).toJSON();

      expect(component).toMatchSnapshot();
    });
    it('should render the passed component if user is set', () => {
      const props = {
        user: {
          organization: 'test',
          apiKey: 'test apiKey'
        }
      };
      const Comp = withAuthRequired(() => <div>Should be rendered</div>);
      const component = renderer.create(<Comp {...props} />).toJSON();

      expect(component).toMatchSnapshot();
    });
  });
});
