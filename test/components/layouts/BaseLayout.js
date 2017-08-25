import React from 'react'
import BaseLayout from '../../../src/components/layouts/BaseLayout'
import renderer from 'react-test-renderer'

jest.mock('../../../src/state')

// transition group uses findDOMNode which doesn't work when snapshot testing
jest.mock('react-addons-css-transition-group', () => 'TransitionGroup')

test('BaseLayout does render', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }

  const component = renderer.create(
    <BaseLayout
      auth={{organization: 'test-organization'}}
      showSidebar={false}
      router={router}
      stacks={{}}
    ><span>Test Baselayout</span></BaseLayout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('BaseLayout does render active sidebar', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }

  const component = renderer.create(
    <BaseLayout
      auth={{organization: 'test-organization'}}
      showSidebar
      router={router}
      stacks={{}}
    ><span>Test Baselayout</span></BaseLayout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('BaseLayout does render alert', () => {
  const router = {
    location: {
      pathname: '/'
    }
  }

  const component = renderer.create(
    <BaseLayout
      auth={{organization: 'test-organization'}}
      showSidebar={false}
      router={router}
      stacks={{}}
      alert={{type: 'error', message: 'test'}}
    ><span>Test Baselayout</span></BaseLayout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
