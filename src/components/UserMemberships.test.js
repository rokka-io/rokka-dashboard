import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { UserMemberships } from './UserMemberships'
import rokka from '../rokka'
import { login } from '../state'

jest.mock('../rokka')
jest.mock('../state')
// render only the children, skip the full BaseLayout/Sidebar chrome
jest.mock('./layouts/BaseLayout', () => ({ children }) => <div>{children}</div>)

const flush = () => act(async () => {})

const mockMemberships = (items) => ({
  request: jest.fn().mockResolvedValue({ body: { total: items.length, items } }),
})

const props = {
  router: { history: { push: jest.fn() } },
  auth: { organization: 'currentorg', apiToken: 'token' },
}

const renderComponent = async () => {
  let component
  await act(async () => {
    component = renderer.create(<UserMemberships {...props} />)
  })
  await flush()
  return component
}

beforeEach(() => {
  jest.clearAllMocks()
})

test('lists the organizations the user is a member of', async () => {
  rokka.mockReturnValue(
    mockMemberships([
      { organization: 'currentorg', display_name: 'Current', roles: ['admin'], active: true },
      { organization: 'otherorg', display_name: 'Other', roles: ['write'], active: true },
    ]),
  )
  const component = await renderComponent()
  const text = JSON.stringify(component.toJSON())
  expect(text).toContain('otherorg')
  expect(text).toContain('currentorg')
})

test('clicking another organization switches to it via login()', async () => {
  rokka.mockReturnValue(
    mockMemberships([
      { organization: 'currentorg', display_name: 'Current', roles: ['admin'], active: true },
      { organization: 'otherorg', display_name: 'Other', roles: ['write'], active: true },
    ]),
  )
  const component = await renderComponent()
  const switchButton = component.root
    .findAllByType('button')
    .find((b) => b.props.children === 'Switch to this organization')
  expect(switchButton).toBeDefined()
  act(() => switchButton.props.onClick())
  expect(login).toHaveBeenCalledWith('otherorg', '', expect.any(Function))
})
