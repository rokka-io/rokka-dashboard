import React from 'react'
import Header from '../../src/components/Header'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

test('Header does render', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header auth={{organization: 'test-organization'}} active={false} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Header does render in active mode', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header auth={{organization: 'test-organization'}} active />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
