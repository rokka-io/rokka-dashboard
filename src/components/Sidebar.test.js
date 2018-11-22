import React from 'react'
import Sidebar from './Sidebar'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

jest.mock('../../src/state')

test('Sidebar does render', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }
  const component = renderer.create(
    <MemoryRouter>
      <Sidebar
        auth={{ organization: 'test-organization' }}
        active={false}
        router={router}
        stacks={{}}
      />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar does render when active', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }

  const component = renderer.create(
    <MemoryRouter initialEntries={['/stacks']}>
      <Sidebar auth={{ organization: 'test-organization' }} active router={router} stacks={{}} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows stacks', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }
  const stacks = {
    filteredItems: [
      { name: 'stack-a' },
      { name: 'stack-b' },
      { name: 'stack-c' },
      { name: 'stack-d' }
    ]
  }

  const component = renderer.create(
    <MemoryRouter>
      <Sidebar
        auth={{ organization: 'test-organization' }}
        active
        router={router}
        stacks={stacks}
      />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows load more button', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }
  const stacks = {
    filteredItems: [
      { name: 'stack-a' },
      { name: 'stack-b' },
      { name: 'stack-c' },
      { name: 'stack-d' }
    ],
    currentOffset: 0,
    total: 20
  }

  const component = renderer.create(
    <MemoryRouter>
      <Sidebar
        auth={{ organization: 'test-organization' }}
        active
        router={router}
        stacks={stacks}
      />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
