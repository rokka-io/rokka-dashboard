import React from 'react'
import renderer, { act } from 'react-test-renderer'
import ApikeyRow, { parseAllowedIps } from './ApikeyRow'
import rokka from '../rokka'
import { toDatetimeLocal } from '../utils/string'

jest.mock('../rokka')
jest.mock('../state')

const flush = () => act(async () => {})

const apiKey = (overrides = {}) => ({
  id: 'keyid',
  comment: 'ci key',
  created: '2026-01-01T00:00:00+00:00',
  accessed: '2026-08-01T00:00:00+00:00',
  requires_mfa: false,
  trusted: false,
  allowed_ips: [],
  expires: null,
  ...overrides,
})

const props = (overrides = {}) => ({
  apiKey: apiKey(),
  currentKeyId: 'otherkey',
  legacyKeyId: 'userid',
  totpState: 'active',
  updateKeys: jest.fn(),
  ...overrides,
})

const renderRow = (componentProps) => renderer.create(<ApikeyRow {...componentProps} />)

const findButton = (component, label) =>
  component.root.findAllByType('button').find((b) => b.props.children === label)

const openEdit = (component) => {
  act(() => findButton(component, 'Edit').props.onClick())
}

const submit = async (component) => {
  const form = component.root.findByType('form')
  await act(async () => form.props.onSubmit({ preventDefault: () => {} }))
  await flush()
}

const checkboxes = (component) =>
  component.root.findAllByType('input').filter((i) => i.props.type === 'checkbox')

beforeEach(() => {
  jest.clearAllMocks()
})

test('parseAllowedIps splits on commas and newlines and drops blanks', () => {
  expect(parseAllowedIps(' 1.2.3.4, 10.0.0.0/24 \n\n 5.6.7.8 ,, ')).toEqual([
    '1.2.3.4',
    '10.0.0.0/24',
    '5.6.7.8',
  ])
  expect(parseAllowedIps('')).toEqual([])
  expect(parseAllowedIps('  \n ')).toEqual([])
})

test('renders the flags, the IP list and the expiry', () => {
  const component = renderRow(
    props({
      apiKey: apiKey({
        requires_mfa: true,
        trusted: true,
        allowed_ips: ['1.2.3.4', '5.6.7.8', '9.9.9.9'],
        expires: '2027-01-01T00:00:00+00:00',
      }),
    }),
  )
  const text = JSON.stringify(component.toJSON())
  expect(text).toContain('1.2.3.4, 5.6.7.8 +1')
  expect(text).toContain('2027')
})

test('marks an expired key', () => {
  const component = renderRow(props({ apiKey: apiKey({ expires: '2020-01-01T00:00:00+00:00' }) }))
  expect(JSON.stringify(component.toJSON())).toContain('(expired)')
})

test('sends only the fields which were actually changed', async () => {
  const patchApiKey = jest.fn().mockResolvedValue({ body: {} })
  rokka.mockReturnValue({ user: { patchApiKey } })
  const componentProps = props({ apiKey: apiKey({ allowed_ips: ['1.2.3.4'] }) })
  const component = renderRow(componentProps)

  openEdit(component)
  act(() => checkboxes(component)[1].props.onChange({ currentTarget: { checked: true } }))
  await submit(component)

  expect(patchApiKey).toHaveBeenCalledWith('keyid', { trusted: true }, {})
  expect(componentProps.updateKeys).toHaveBeenCalled()
})

test('clears the whitelist with null and the expiry with null', async () => {
  const patchApiKey = jest.fn().mockResolvedValue({ body: {} })
  rokka.mockReturnValue({ user: { patchApiKey } })
  const component = renderRow(
    props({
      apiKey: apiKey({ allowed_ips: ['1.2.3.4'], expires: '2030-01-01T00:00:00+00:00' }),
    }),
  )

  openEdit(component)
  const textarea = component.root.findByType('textarea')
  act(() => textarea.props.onChange({ currentTarget: { value: '' } }))
  act(() => findButton(component, 'Clear').props.onClick())
  await submit(component)

  expect(patchApiKey).toHaveBeenCalledWith('keyid', { allowed_ips: null, expires: null }, {})
})

test('does not patch at all when nothing changed', async () => {
  const patchApiKey = jest.fn()
  rokka.mockReturnValue({ user: { patchApiKey } })
  const component = renderRow(props())

  openEdit(component)
  await submit(component)

  expect(patchApiKey).not.toHaveBeenCalled()
})

test('keeps an untouched expiry out of the patch', async () => {
  const patchApiKey = jest.fn().mockResolvedValue({ body: {} })
  rokka.mockReturnValue({ user: { patchApiKey } })
  const expires = new Date(Date.now() + 86400000).toISOString()
  const component = renderRow(props({ apiKey: apiKey({ expires }) }))

  openEdit(component)
  act(() => checkboxes(component)[0].props.onChange({ currentTarget: { checked: true } }))
  await submit(component)

  expect(patchApiKey).toHaveBeenCalledWith('keyid', { requires_mfa: true }, {})
  // sanity check on the round trip the form does with the date
  expect(toDatetimeLocal(expires)).not.toBe('')
})

test('refuses more than 10 allowed IPs without asking the API', async () => {
  const patchApiKey = jest.fn()
  rokka.mockReturnValue({ user: { patchApiKey } })
  const component = renderRow(props())

  openEdit(component)
  const ips = Array.from({ length: 11 }, (unused, i) => `10.0.0.${i}`).join('\n')
  act(() => component.root.findByType('textarea').props.onChange({ currentTarget: { value: ips } }))
  await submit(component)

  expect(patchApiKey).not.toHaveBeenCalled()
  expect(JSON.stringify(component.toJSON())).toContain('more than 10 allowed IPs')
})

test('offers to force a change the lockout guard refused, and repeats it with force', async () => {
  const patchApiKey = jest
    .fn()
    .mockRejectedValueOnce({
      statusCode: 400,
      body: {
        error: {
          code: 400,
          message:
            'This allowed_ips whitelist would lock this key out from your current IP (1.2.3.4). Include your current IP, use a different key, or pass ?force=true to override.',
        },
      },
    })
    .mockResolvedValue({ body: {} })
  rokka.mockReturnValue({ user: { patchApiKey } })
  const componentProps = props({ currentKeyId: 'keyid' })
  const component = renderRow(componentProps)

  openEdit(component)
  act(() =>
    component.root.findByType('textarea').props.onChange({ currentTarget: { value: '9.9.9.9' } }),
  )
  await submit(component)

  expect(patchApiKey).toHaveBeenCalledWith('keyid', { allowed_ips: ['9.9.9.9'] }, {})
  expect(JSON.stringify(component.toJSON())).toContain('would lock this key out')

  await act(async () => findButton(component, 'Do it anyway').props.onClick())
  await flush()

  expect(patchApiKey).toHaveBeenLastCalledWith(
    'keyid',
    { allowed_ips: ['9.9.9.9'] },
    { force: true },
  )
  expect(componentProps.updateKeys).toHaveBeenCalled()
})

test('does not offer to force an error the guard has nothing to do with', async () => {
  const patchApiKey = jest.fn().mockRejectedValue({
    statusCode: 400,
    body: { error: { code: 400, message: 'allowed_ips entries must not be empty' } },
  })
  rokka.mockReturnValue({ user: { patchApiKey } })
  const component = renderRow(props())

  openEdit(component)
  act(() =>
    component.root.findByType('textarea').props.onChange({ currentTarget: { value: '1.2.3.4' } }),
  )
  await submit(component)

  expect(findButton(component, 'Do it anyway')).toBeUndefined()
})

test('the legacy key gets no edit button', () => {
  const component = renderRow(props({ apiKey: apiKey({ id: 'userid' }) }))

  expect(findButton(component, 'Edit')).toBeUndefined()
  expect(JSON.stringify(component.toJSON())).toContain("can't carry any of these settings")
})

test('warns when requiring MFA without an active TOTP setup', () => {
  const component = renderRow(props({ totpState: 'none' }))

  openEdit(component)
  act(() => checkboxes(component)[0].props.onChange({ currentTarget: { checked: true } }))

  expect(JSON.stringify(component.toJSON())).toContain(
    "You don't have an active two-factor setup yet",
  )
})
