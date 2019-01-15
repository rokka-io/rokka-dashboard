import { ChangeEvent } from 'react';
import { handleChange } from './handleChange';

describe('Forms', () => {
  describe('HandleChange', () => {
    it('calls onChange fn with the input data', () => {
      const onChange = jest.fn();

      const target = {
        type: 'text',
        name: 'testname',
        value: 'testvalue'
      } as HTMLInputElement;
      const event = { target } as ChangeEvent<HTMLInputElement>;

      handleChange(onChange)(event);

      expect(onChange).toHaveBeenCalledWith({ testname: 'testvalue' });
    });
    it('calls onChange fn with the input checkbox data', () => {
      const onChange = jest.fn();

      const target = {
        type: 'checkbox',
        name: 'testname',
        checked: true
      } as HTMLInputElement;
      const event = { target } as ChangeEvent<HTMLInputElement>;

      handleChange(onChange)(event);

      expect(onChange).toHaveBeenCalledWith({ testname: true });
    });
  });
});
