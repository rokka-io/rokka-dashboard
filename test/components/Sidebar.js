import React from 'react'
import Sidebar from '../../src/components/Sidebar'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

jest.mock('../../src/state')

test('Sidebar does render', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }
  const component = renderer.create(
    <Sidebar
      auth={{organization: 'test-organization'}}
      active={false}
      router={router}
      stacks={{}}
    />
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
    <Sidebar
      auth={{organization: 'test-organization'}}
      active
      router={router}
      stacks={{}}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows stacks', () => {
  const router = {
    location: {
      pathname: '/stack'
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
    <Sidebar
      auth={{organization: 'test-organization'}}
      active
      router={router}
      stacks={stacks}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows load more button', () => {
  const router = {
    location: {
      pathname: '/stack'
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
    <Sidebar
      auth={{organization: 'test-organization'}}
      active
      router={router}
      stacks={stacks}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sidebar shows filtered stacks', () => {
  const router = {
    location: {
      pathname: '/stack'
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

  const component = shallow(
    <Sidebar
      auth={{organization: 'test-organization'}}
      active
      router={router}
      stacks={stacks}
    />
  )

  expect(component.find('.rka-stacks-list > Link').length).toBe(4)

  component.find('input').simulate('change', {target: {value: 'stack-a'}})

  expect(component.find('.rka-stacks-list > Link').length).toBe(1)
})
