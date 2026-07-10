import React from 'react'
import renderer, { act } from 'react-test-renderer'
import ApikeyRow from './ApikeyRow'
import rokka from '../rokka'

const mockPatchApiKey = jest.fn().mockResolvedValue({ body: {} })

jest.mock('../rokka', () => ({
  __esModule: true,
  default: jest.fn(() => ({ user: { patchApiKey: mockPatchApiKey } })),
}))

beforeEach(() => {
  jest.clearAllMocks()
  mockPatchApiKey.mockResolvedValue({ body: {} })
  rokka.mockReturnValue({ user: { patchApiKey: mockPatchApiKey } })
})

const renderRow = (apiKey, currentKeyId = 'other') => {
  const updateKeys = jest.fn()
  let component
  act(() => {
    component = renderer.create(
      <table>
        <tbody>
          <ApikeyRow apiKey={apiKey} currentKeyId={currentKeyId} updateKeys={updateKeys} />
        </tbody>
      </table>,
    )
  })
  return { component, updateKeys }
}

test('toggling requires_mfa patches the key', async () => {
  const { component, updateKeys } = renderRow({
    id: 'key1',
    created: '2026-01-01T00:00:00+00:00',
    requires_mfa: false,
  })
  const checkbox = component.root.findByType('input')
  await act(async () => {
    checkbox.props.onChange()
  })
  expect(mockPatchApiKey).toHaveBeenCalledWith('key1', { requires_mfa: true })
  expect(updateKeys).toHaveBeenCalled()
})

test('flagging the current key asks for confirmation', async () => {
  const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false)
  const { component } = renderRow(
    { id: 'currentkey', created: '2026-01-01T00:00:00+00:00', requires_mfa: false },
    'currentkey',
  )
  const checkbox = component.root.findByType('input')
  await act(async () => {
    checkbox.props.onChange()
  })
  expect(confirmSpy).toHaveBeenCalled()
  expect(mockPatchApiKey).not.toHaveBeenCalled()
  confirmSpy.mockRestore()
})

test('legacy keys (no created date) show n/a and no toggle', () => {
  const { component } = renderRow({ id: 'legacy', requires_mfa: false })
  expect(component.root.findAllByType('input')).toHaveLength(0)
  const na = component.root.findByProps({ className: 'rka-mfa-status rka-mfa-status-none' })
  expect(na.props.children).toBe('n/a')
})
