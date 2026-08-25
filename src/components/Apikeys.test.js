import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Apikeys } from './Apikeys'
import rokka from '../rokka'

jest.mock('../rokka')
jest.mock('../state')
// render only the children, skip the full BaseLayout/Sidebar chrome
jest.mock('./layouts/BaseLayout', () => ({ children }) => <div>{children}</div>)

const flush = () => act(async () => {})

const mockUser = (mfaState) => ({
  user: {
    getCurrentApiKey: jest.fn().mockResolvedValue({ body: { id: 'key1' } }),
    listApiKeys: jest.fn().mockResolvedValue({
      body: [{ id: 'key1', created: '2026-01-01T00:00:00+00:00', requires_mfa: false }],
    }),
    getMfaTotp: jest.fn().mockResolvedValue({ body: { state: mfaState } }),
    disableMfaTotp: jest.fn().mockResolvedValue({}),
  },
})

const props = {
  router: { history: { push: () => {} } },
  auth: { organization: 'org', apiToken: 'token' },
}

const renderApikeys = async () => {
  let component
  await act(async () => {
    component = renderer.create(<Apikeys {...props} />)
  })
  await flush()
  return component
}

test('shows the set-up button when MFA state is none', async () => {
  rokka.mockReturnValue(mockUser('none'))
  const component = await renderApikeys()
  const buttons = component.root.findAllByType('button').map((b) => b.props.children)
  expect(buttons).toContain('Set up MFA')
})

test('shows the disable button when MFA is active', async () => {
  rokka.mockReturnValue(mockUser('active'))
  const component = await renderApikeys()
  const buttons = component.root.findAllByType('button').map((b) => b.props.children)
  expect(buttons).toContain('Disable MFA')
})
