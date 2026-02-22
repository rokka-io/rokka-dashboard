import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { authRequired } from './auth'

jest.mock('../state')

const ProtectedComponent = () => <div>Protected Content</div>
const WrappedComponent = authRequired(ProtectedComponent)

test('authRequired renders Login when no auth is provided', () => {
  const component = renderer.create(
    <MemoryRouter>
      <WrappedComponent auth={null} />
    </MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('authRequired renders Login when auth has no apiToken', () => {
  const component = renderer.create(
    <MemoryRouter>
      <WrappedComponent auth={{ apiToken: null }} />
    </MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('authRequired renders protected component when authenticated', () => {
  const component = renderer.create(
    <MemoryRouter>
      <WrappedComponent auth={{ apiToken: 'valid-token' }} />
    </MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
