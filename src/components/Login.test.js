import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Login from './Login'
import { login } from '../state'
import { rawKeyClient } from '../rokka'

jest.mock('../rokka')
jest.mock('../state')

const flush = () => act(async () => {})

const authError = (code, statusCode = 401) => ({
  statusCode,
  body: { code: statusCode, message: 'nope', error: code, invalid_authentication: true },
})

const renderComponent = () => renderer.create(<Login />)

const findInput = (component, name) =>
  component.root.findAllByType('input').find((i) => i.props.name === name)

const fill = (component, name, value) => {
  act(() => findInput(component, name).props.onChange({ currentTarget: { name, value } }))
}

const submit = async (component) => {
  const form = component.root.findByType('form')
  await act(async () => form.props.onSubmit({ preventDefault: () => {} }))
  await flush()
}

const enterCredentials = (component) => {
  fill(component, 'organization', 'myorg')
  fill(component, 'apiKey', 'thekey')
}

beforeEach(() => {
  jest.clearAllMocks()
})

test('asks for a code when the key requires MFA, and logs in with it', async () => {
  login.mockRejectedValueOnce(authError('mfa_required'))
  const component = renderComponent()

  enterCredentials(component)
  await submit(component)

  expect(login).toHaveBeenCalledWith('myorg', 'thekey', expect.any(Function), '')
  expect(findInput(component, 'totp')).toBeDefined()

  login.mockResolvedValueOnce(undefined)
  fill(component, 'totp', '123456')
  await submit(component)

  expect(login).toHaveBeenLastCalledWith('myorg', 'thekey', expect.any(Function), '123456')
})

test('stays on the code field when the code was wrong', async () => {
  login.mockRejectedValueOnce(authError('mfa_required'))
  const component = renderComponent()

  enterCredentials(component)
  await submit(component)

  login.mockRejectedValueOnce(authError('totp_invalid'))
  fill(component, 'totp', '000000')
  await submit(component)

  const totp = findInput(component, 'totp')
  expect(totp).toBeDefined()
  // the used code is cleared, so the next one can be typed right away
  expect(totp.props.value).toBe('')
})

test('offers the TOTP enrollment when the key has no setup yet', async () => {
  login.mockRejectedValueOnce(authError('mfa_enrollment_required'))
  const setupMfaTotp = jest.fn().mockResolvedValue({
    body: { state: 'pending', secret: 'ABCDEF', provisioning_uri: 'otpauth://totp/rokka:me' },
  })
  const confirmMfaTotp = jest.fn().mockResolvedValue({ body: { state: 'active' } })
  rawKeyClient.mockReturnValue({ user: { setupMfaTotp, confirmMfaTotp } })
  const component = renderComponent()

  enterCredentials(component)
  await submit(component)

  expect(rawKeyClient).toHaveBeenCalledWith('thekey')
  expect(setupMfaTotp).toHaveBeenCalled()
  expect(JSON.stringify(component.toJSON())).toContain('ABCDEF')
  expect(component.root.findAllByType('svg').length).toBeGreaterThan(0)

  fill(component, 'totp', '123456')
  await submit(component)

  expect(confirmMfaTotp).toHaveBeenCalledWith('123456')
  // the code we just used can't mint a token anymore, so ask for the next one
  expect(JSON.stringify(component.toJSON())).toContain('Wait for the next code')
  expect(findInput(component, 'totp').props.value).toBe('')
})

test('goes back to organization and key for any other failure', async () => {
  login.mockRejectedValueOnce(authError('key_expired'))
  const component = renderComponent()

  enterCredentials(component)
  await submit(component)

  expect(findInput(component, 'totp')).toBeUndefined()
  expect(findInput(component, 'apiKey')).toBeDefined()
})
