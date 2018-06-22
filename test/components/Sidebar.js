import React from 'react'
import Sidebar from '../../src/components/Sidebar'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
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
        auth={{organization: 'test-organization'}}
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
      <Sidebar
        auth={{organization: 'test-organization'}}
        active
        router={router}
        stacks={{}}
      />
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
    items: [
      {name: 'stack-a'},
      {name: 'stack-b'},
      {name: 'stack-c'},
      {name: 'stack-d'}
    ]
  }

  const component = renderer.create(
    <MemoryRouter>
      <Sidebar
        auth={{organization: 'test-organization'}}
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
    items: [
      {name: 'stack-a'},
      {name: 'stack-b'},
      {name: 'stack-c'},
      {name: 'stack-d'}
    ],
    currentOffset: 0,
    total: 20
  }

  const component = renderer.create(
    <MemoryRouter>
      <Sidebar
        auth={{organization: 'test-organization'}}
        active
        router={router}
        stacks={stacks}
      />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows filtered stacks', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }
  const stacks = {
    items: [
      {name: 'stack-a'},
      {name: 'stack-b'},
      {name: 'stack-c'},
      {name: 'stack-d'}
    ]
  }

  const component = mount(
    <MemoryRouter>
      <Sidebar
        auth={{organization: 'test-organization'}}
        active
        router={router}
        stacks={stacks}
      />
    </MemoryRouter>
  )
  let sidebar = component.find(Sidebar)

  expect(sidebar.find('.rka-stacks-list > NavLink').length).toBe(4)

  const searchField = sidebar.find('input.rka-stack-search')
  searchField.instance().value = 'stack-a'
  searchField.simulate('change')

  sidebar = component.find(Sidebar)
  expect(sidebar.find('.rka-stacks-list > NavLink').length).toBe(1)
})
