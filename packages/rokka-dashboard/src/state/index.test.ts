import { currentState, login, subscribe, testResetState, toggleSidebar } from './index';

jest.mock('rokka');

describe('State', () => {
  beforeEach(() => {
    testResetState();
  });

  it('should give me the current state', () => {
    expect(currentState()).toEqual({
      showSidebar: false
    });
  });

  describe('login', () => {
    it('should update the state to logged in when authenticating correctly', async () => {
      const subscriber = jest.fn();
      subscribe(subscriber);

      await login('test', 'test apiKey');

      expect(subscriber).toBeCalledTimes(2);
      expect(subscriber).toHaveBeenNthCalledWith(1, {
        showSidebar: false,
        user: { organization: 'test', apiKey: 'test apiKey' }
      });
      expect(subscriber).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          operations: expect.any(Object),
          stackOptions: expect.any(Object)
        })
      );
    });
    it('should reject the promise if not authenticated', async () => {
      const subscriber = jest.fn();
      subscribe(subscriber);

      expect(login('test', 'invalid')).rejects.toThrow();

      expect(subscriber).toBeCalledTimes(0);
    });
  });

  describe('toggleSidebar', () => {
    it('should switch the sidebar from true to false and vice-versa', () => {
      const subscriber = jest.fn();
      subscribe(subscriber);

      toggleSidebar();
      toggleSidebar();

      expect(subscriber).toBeCalledTimes(2);
      expect(subscriber).toHaveBeenNthCalledWith(1, {
        showSidebar: true
      });
      expect(subscriber).toHaveBeenNthCalledWith(2, {
        showSidebar: false
      });
    });
  });
});
