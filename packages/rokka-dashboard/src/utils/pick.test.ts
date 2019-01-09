import { pick } from './pick';

describe('utils', () => {
  describe('pick', () => {
    it('picks given properties from an object', () => {
      const obj = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
      const picked = pick(obj, 'bar', 'baz');
      expect(picked).toEqual({
        bar: 'bar',
        baz: 'baz'
      });
    });
  });
});
