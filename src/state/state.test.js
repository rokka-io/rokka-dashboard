import {
  normalizeStack,
  addIdAndErrorsToStackOperations,
  removeIdAndErrorsToStackOperations,
  setAlert,
  removeAlert,
  subscribe,
  toggleSidebar,
  cloneStack,
  resetStackClone,
  filterStacks,
  clearDeletedImages,
  updateUploadedImages,
  clearUploadedImages,
  logout,
} from './index'

// We need to mock rokka so the module-level login() call doesn't fail
jest.mock('../rokka', () => {
  const mock = () => ({
    user: { getTokenIsValidFor: () => -1, getToken: () => null },
    organizations: { get: () => Promise.resolve() },
    operations: { list: () => Promise.resolve({ body: {} }) },
    stackoptions: { get: () => Promise.resolve({ body: {} }) },
    stacks: { list: () => Promise.resolve({ body: { items: [] } }) },
    sourceimages: { delete: () => Promise.resolve() },
    render: { getUrl: () => '' },
  })
  mock.apiTokenGetCallback = () => null
  mock.authenticate = () => {}
  mock.resetClient = () => {}
  mock.ROKKA_DASHBOARD_ORG = 'rokka-dashboard-org'
  mock.ROKKA_DASHBOARD_TOKEN = 'rokka-dashboard-token'
  mock.default = mock
  return mock
})

let lastState = null

beforeEach(() => {
  lastState = null
  subscribe((state) => {
    lastState = state
  })
})

describe('normalizeStack', () => {
  test('renames stack_operations to operations', () => {
    const stack = { stack_operations: [{ name: 'resize' }] }
    const result = normalizeStack(stack)
    expect(result.operations).toEqual([{ name: 'resize' }])
    expect(result.stack_operations).toBeUndefined()
  })

  test('renames stack_options to options', () => {
    const stack = { stack_options: { quality: 80 } }
    const result = normalizeStack(stack)
    expect(result.options).toEqual({ quality: 80 })
    expect(result.stack_options).toBeUndefined()
  })

  test('renames stack_expressions to expressions', () => {
    const stack = { stack_expressions: [{ expr: 'test' }] }
    const result = normalizeStack(stack)
    expect(result.expressions).toEqual([{ expr: 'test' }])
    expect(result.stack_expressions).toBeUndefined()
  })

  test('renames stack_variables to variables', () => {
    const stack = { stack_variables: { w: 100 } }
    const result = normalizeStack(stack)
    expect(result.variables).toEqual({ w: 100 })
    expect(result.stack_variables).toBeUndefined()
  })

  test('does not modify stack without prefixed keys', () => {
    const stack = { operations: [{ name: 'blur' }], options: { quality: 90 } }
    const result = normalizeStack(stack)
    expect(result.operations).toEqual([{ name: 'blur' }])
    expect(result.options).toEqual({ quality: 90 })
  })

  test('returns a new object (does not return same reference)', () => {
    const stack = { operations: [] }
    const result = normalizeStack(stack)
    expect(result).not.toBe(stack)
  })
})

describe('addIdAndErrorsToStackOperations', () => {
  test('adds id and errors to operations without them', () => {
    const stack = { operations: [{ name: 'resize' }, { name: 'blur' }] }
    const result = addIdAndErrorsToStackOperations(stack)
    result.operations.forEach((op) => {
      expect(op.id).toBeDefined()
      expect(op.errors).toEqual({})
    })
  })

  test('preserves existing id and errors', () => {
    const stack = {
      operations: [{ name: 'resize', id: 'existing-id', errors: { width: 'required' } }],
    }
    const result = addIdAndErrorsToStackOperations(stack)
    expect(result.operations[0].id).toBe('existing-id')
    expect(result.operations[0].errors).toEqual({ width: 'required' })
  })
})

describe('removeIdAndErrorsToStackOperations', () => {
  test('removes id, errors, name, organization, created from stack', () => {
    const stack = {
      name: 'test',
      organization: 'org',
      created: '2020-01-01',
      operations: [{ name: 'resize', id: '123', errors: { width: 'err' } }],
    }
    const result = removeIdAndErrorsToStackOperations(stack)
    expect(result.name).toBeUndefined()
    expect(result.organization).toBeUndefined()
    expect(result.created).toBeUndefined()
    result.operations.forEach((op) => {
      expect(op.id).toBeUndefined()
      expect(op.errors).toBeUndefined()
    })
  })
})

describe('alert management', () => {
  test('setAlert updates state with alert', () => {
    setAlert('error', 'Something broke')
    expect(lastState.alert).toEqual({ type: 'error', message: 'Something broke' })
  })

  test('removeAlert clears the alert', () => {
    setAlert('error', 'Something broke')
    removeAlert()
    expect(lastState.alert).toBeNull()
  })

  test('setAlert with timeout auto-removes alert', () => {
    jest.useFakeTimers()
    setAlert('success', 'Saved', 5000)
    expect(lastState.alert).toEqual({ type: 'success', message: 'Saved' })
    jest.advanceTimersByTime(5000)
    expect(lastState.alert).toBeNull()
    jest.useRealTimers()
  })
})

describe('subscribe', () => {
  test('returns an unsubscribe function', () => {
    const unsub = subscribe(() => {})
    expect(typeof unsub).toBe('function')
  })
})

describe('toggleSidebar', () => {
  test('toggles showSidebar state', () => {
    toggleSidebar()
    const first = lastState.showSidebar
    toggleSidebar()
    expect(lastState.showSidebar).toBe(!first)
  })
})

describe('cloneStack and resetStackClone', () => {
  test('cloneStack stores normalized stack with name', () => {
    cloneStack('my-clone', {
      stack_operations: [{ name: 'resize' }],
      stack_options: { quality: 80 },
    })
    expect(lastState.stackClone.name).toBe('my-clone')
    expect(lastState.stackClone.operations).toEqual([{ name: 'resize' }])
    expect(lastState.stackClone.options).toEqual({ quality: 80 })
  })

  test('resetStackClone clears stackClone', () => {
    cloneStack('clone', { stack_operations: [] })
    resetStackClone()
    expect(lastState.stackClone).toEqual({})
  })
})

describe('image management', () => {
  test('updateUploadedImages sets uploaded images and clears deleted', () => {
    updateUploadedImages([{ hash: 'abc' }])
    expect(lastState.uploadedImages).toEqual([{ hash: 'abc' }])
    expect(lastState.deletedImages).toEqual([])
  })

  test('clearUploadedImages empties the list', () => {
    updateUploadedImages([{ hash: 'abc' }])
    clearUploadedImages()
    expect(lastState.uploadedImages).toEqual([])
  })

  test('clearDeletedImages empties the list', () => {
    clearDeletedImages()
    expect(lastState.deletedImages).toEqual([])
  })
})

describe('logout', () => {
  test('resets state to defaults', () => {
    setAlert('error', 'test')
    logout()
    expect(lastState.auth).toBeNull()
    expect(lastState.alert).toBeNull()
    expect(lastState.stacks).toEqual({})
    expect(lastState.uploadedImages).toEqual([])
    expect(lastState.deletedImages).toEqual([])
  })
})
