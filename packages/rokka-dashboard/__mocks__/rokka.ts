export default ({ apiKey = null } = {}) => {
  const throwIfNoOrInvalidApiKey = () => {
    if (!apiKey) {
      throw new Error('not authenticated');
    }
    if (apiKey === 'invalid') {
      throw new Error('invalid apiKey used');
    }
  };
  const returnFixture = async (fixture: string): Promise<{ body: string }> => {
    const body = await import(fixture);
    return {
      body
    };
  };
  return {
    organizations: {
      get: () => {
        throwIfNoOrInvalidApiKey();
      }
    },
    operations: {
      list: async () => {
        return returnFixture('./fixtures/operations-list.json');
      }
    },
    stackoptions: {
      get: async () => {
        return returnFixture('./fixtures/stackoptions-get.json');
      }
    }
  };
};
