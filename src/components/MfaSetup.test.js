import React from 'react'
import renderer, { act } from 'react-test-renderer'
import MfaSetup from './MfaSetup'
import rokka from '../rokka'

jest.mock('../rokka')
jest.mock('../state')

const flush = () => act(async () => {})

const mockUser = (user) => rokka.mockReturnValue({ user })

const props = () => ({
  onTotpState: jest.fn(),
  updateKeys: jest.fn(),
})

const renderComponent = async (componentProps) => {
  let component
  await act(async () => {
    component = renderer.create(<MfaSetup {...componentProps} />)
  })
  await flush()
  return component
}

const findButton = (component, label) =>
  component.root.findAllByType('button').find((b) => b.props.children === label)

beforeEach(() => {
  jest.clearAllMocks()
})

test('offers the setup when no TOTP is configured', async () => {
  mockUser({ getMfaTotp: jest.fn().mockResolvedValue({ body: { state: 'none' } }) })
  const componentProps = props()
  const component = await renderComponent(componentProps)

  expect(componentProps.onTotpState).toHaveBeenCalledWith('none')
  expect(findButton(component, 'Set up two-factor authentication')).toBeDefined()
})

test('shows the QR code and the secret after starting a setup', async () => {
  const setupMfaTotp = jest.fn().mockResolvedValue({
    body: {
      state: 'pending',
      secret: 'ABCDEF',
      provisioning_uri: 'otpauth://totp/rokka:me?secret=ABCDEF',
    },
  })
  mockUser({
    getMfaTotp: jest.fn().mockResolvedValue({ body: { state: 'none' } }),
    setupMfaTotp,
  })
  const componentProps = props()
  const component = await renderComponent(componentProps)

  await act(async () => findButton(component, 'Set up two-factor authentication').props.onClick())
  await flush()

  expect(setupMfaTotp).toHaveBeenCalled()
  expect(componentProps.onTotpState).toHaveBeenLastCalledWith('pending')
  const text = JSON.stringify(component.toJSON())
  expect(text).toContain('ABCDEF')
  expect(component.root.findAllByType('svg').length).toBeGreaterThan(0)
})

test('confirms a pending setup with a code and reloads the state', async () => {
  const confirmMfaTotp = jest.fn().mockResolvedValue({ body: { state: 'active' } })
  const getMfaTotp = jest
    .fn()
    .mockResolvedValueOnce({ body: { state: 'pending' } })
    .mockResolvedValue({ body: { state: 'active', confirmed: '2026-08-28T10:00:00+00:00' } })
  mockUser({ getMfaTotp, confirmMfaTotp, setupMfaTotp: jest.fn() })
  const componentProps = props()
  const component = await renderComponent(componentProps)

  const input = component.root.findByType('input')
  act(() => input.props.onChange({ currentTarget: { value: '123456' } }))

  const form = component.root.findByType('form')
  await act(async () => form.props.onSubmit({ preventDefault: () => {} }))
  await flush()

  expect(confirmMfaTotp).toHaveBeenCalledWith('123456')
  expect(componentProps.onTotpState).toHaveBeenLastCalledWith('active')
})

test('an active setup can be disabled with a code, and reloads the keys', async () => {
  const disableMfaTotp = jest.fn().mockResolvedValue({})
  mockUser({
    getMfaTotp: jest.fn().mockResolvedValue({ body: { state: 'active', confirmed: null } }),
    disableMfaTotp,
  })
  const componentProps = props()
  const component = await renderComponent(componentProps)

  await act(async () => findButton(component, 'Disable two-factor authentication').props.onClick())
  const input = component.root.findByType('input')
  act(() => input.props.onChange({ currentTarget: { value: '654321' } }))
  const form = component.root.findByType('form')
  await act(async () => form.props.onSubmit({ preventDefault: () => {} }))
  await flush()

  expect(disableMfaTotp).toHaveBeenCalledWith('654321')
  expect(componentProps.updateKeys).toHaveBeenCalled()
})

test('turns a 429 into the rate limit message', async () => {
  mockUser({
    getMfaTotp: jest.fn().mockResolvedValue({ body: { state: 'none' } }),
    setupMfaTotp: jest.fn().mockRejectedValue({ statusCode: 429, body: {} }),
  })
  const component = await renderComponent(props())

  await act(async () => findButton(component, 'Set up two-factor authentication').props.onClick())
  await flush()

  expect(JSON.stringify(component.toJSON())).toContain('Too many code attempts')
})
