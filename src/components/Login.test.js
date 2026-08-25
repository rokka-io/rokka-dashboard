import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Login from './Login'
import { login } from '../state'
import { createApiKeyClient } from '../rokka'

jest.mock('../state', () => ({
  login: jest.fn(),
}))
jest.mock('../rokka', () => ({
  // setupMfaTotp stays pending so MfaEnrollment keeps its loading state
  createApiKeyClient: jest.fn(() => ({
    user: { setupMfaTotp: () => new Promise(() => {}) },
  })),
}))
// keep MfaEnrollment out of this unit test, it has its own test file
jest.mock('./MfaEnrollment', () => () => <div className="rka-mfa-enrollment-stub" />)

const flush = () => act(async () => {})

afterEach(() => {
  jest.clearAllMocks()
})

test('Login renders the credentials step', () => {
  const component = renderer.create(<Login />)
  expect(component.root.findByProps({ id: 'organization' })).toBeTruthy()
  expect(component.root.findByProps({ id: 'apiKey' })).toBeTruthy()
})

test('Login switches to the totp step on mfa_required', async () => {
  login.mockRejectedValue({ body: { error: 'mfa_required' } })
  const component = renderer.create(<Login />)

  const form = component.root.findByType('form')
  await act(async () => {
    form.props.onSubmit({ preventDefault: () => {} })
  })
  await flush()

  expect(component.root.findByProps({ id: 'totp' })).toBeTruthy()
})

test('Login shows a rate limit message on totp_rate_limited', async () => {
  login.mockRejectedValue({ body: { error: 'totp_rate_limited' } })
  const component = renderer.create(<Login />)

  const form = component.root.findByType('form')
  await act(async () => {
    form.props.onSubmit({ preventDefault: () => {} })
  })
  await flush()

  const error = component.root.findByProps({ className: 'rka-mfa-error' })
  expect(error.props.children).toMatch(/too many attempts/i)
})

test('Login shows the enrollment wizard on mfa_enrollment_required', async () => {
  login.mockRejectedValue({ body: { error: 'mfa_enrollment_required' } })
  const component = renderer.create(<Login />)

  const form = component.root.findByType('form')
  await act(async () => {
    form.props.onSubmit({ preventDefault: () => {} })
  })
  await flush()

  expect(createApiKeyClient).toHaveBeenCalled()
  expect(component.root.findByProps({ className: 'rka-mfa-enrollment-stub' })).toBeTruthy()
})
