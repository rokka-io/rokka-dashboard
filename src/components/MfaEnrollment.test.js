import React from 'react'
import renderer, { act } from 'react-test-renderer'
import MfaEnrollment from './MfaEnrollment'

const flush = () => act(async () => {})

const makeClient = (overrides = {}) => ({
  user: {
    setupMfaTotp: jest.fn().mockResolvedValue({
      body: {
        secret: 'JBSWY3DPEHPK3PXP',
        provisioning_uri:
          'otpauth://totp/rokka%3Auser%40example.com?issuer=rokka&secret=JBSWY3DPEHPK3PXP',
        state: 'pending',
      },
    }),
    confirmMfaTotp: jest.fn().mockResolvedValue({ body: { state: 'active' } }),
    ...overrides,
  },
})

test('MfaEnrollment shows the secret after setup', async () => {
  const client = makeClient()
  let component
  await act(async () => {
    component = renderer.create(
      <MfaEnrollment client={client} onEnrolled={() => {}} onCancel={() => {}} />,
    )
  })
  await flush()
  expect(client.user.setupMfaTotp).toHaveBeenCalledTimes(1)
  expect(component.toJSON()).toMatchSnapshot()
})

test('MfaEnrollment calls onEnrolled with the confirmed code', async () => {
  const client = makeClient()
  const onEnrolled = jest.fn()
  let component
  await act(async () => {
    component = renderer.create(
      <MfaEnrollment client={client} onEnrolled={onEnrolled} onCancel={() => {}} />,
    )
  })
  await flush()

  const input = component.root.findByProps({ id: 'mfa-enroll-code' })
  act(() => {
    input.props.onChange({ currentTarget: { value: '123456' } })
  })
  const form = component.root.findByType('form')
  await act(async () => {
    form.props.onSubmit({ preventDefault: () => {} })
  })

  expect(client.user.confirmMfaTotp).toHaveBeenCalledWith('123456')
  expect(onEnrolled).toHaveBeenCalledWith('123456')
})

test('MfaEnrollment shows a retry message on a wrong code', async () => {
  const client = makeClient({
    confirmMfaTotp: jest.fn().mockRejectedValue({ statusCode: 400, body: { message: 'bad' } }),
  })
  const onEnrolled = jest.fn()
  let component
  await act(async () => {
    component = renderer.create(
      <MfaEnrollment client={client} onEnrolled={onEnrolled} onCancel={() => {}} />,
    )
  })
  await flush()

  const input = component.root.findByProps({ id: 'mfa-enroll-code' })
  act(() => {
    input.props.onChange({ currentTarget: { value: '000000' } })
  })
  const form = component.root.findByType('form')
  await act(async () => {
    form.props.onSubmit({ preventDefault: () => {} })
  })

  expect(onEnrolled).not.toHaveBeenCalled()
  const error = component.root.findByProps({ className: 'rka-mfa-error' })
  expect(error.props.children).toMatch(/try again/i)
})
