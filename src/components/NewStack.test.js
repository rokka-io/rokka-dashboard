import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'
import { MemoryRouter } from 'react-router'
import { NewStack } from '../../src/components/NewStack'
import operations from '../__tests__/operations.json'
import stackOptions from '../__tests__/stackoptions.json'
import cloneStack from '../__tests__/cloneStack.json'

// N.B. this test currently triggers a warning because
//      onComponentDidMount calls an update on the state.
//      Making this better testable is one of the goals of refactoring.

function wrapInTestContext (DecoratedComponent) {
  class TestContextContainer extends Component {
    render () {
      return <DecoratedComponent {...this.props} />
    }
  }

  return DragDropContext(TestBackend)(TestContextContainer)
}

const router = {
  location: {
    pathname: '/new-stack'
  },
  history: {
    push: () => {
      throw new Error('should not be called')
    }
  }
}
const stacks = {
  items: []
}

test('NewStack does render with minimal props', () => {
  const auth = {
    organization: 'test-org'
  }
  const onOpenChoosePreviewImage = () => {
    throw new Error('should not be called')
  }
  const loadPreviewImage = () => {}

  const props = {
    auth,
    operations,
    router,
    stacks,
    onOpenChoosePreviewImage,
    loadPreviewImage
  }

  const component = renderer.create(
    <MemoryRouter>
      <NewStack {...props} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('NewStack does render with a previewImage', () => {
  const auth = {
    organization: 'test-org'
  }
  const onOpenChoosePreviewImage = () => {
    throw new Error('should not be called')
  }
  const loadPreviewImage = () => {}
  const previewImage = {
    hash: '7cb0101d53f1579c0e0da11f2407146eebeca638',
    format: 'image/png'
  }

  const props = {
    auth,
    operations,
    router,
    stacks,
    onOpenChoosePreviewImage,
    loadPreviewImage,
    previewImage
  }

  const component = renderer.create(
    <MemoryRouter>
      <NewStack {...props} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('NewStack does render with stackOptions', () => {
  const auth = {
    organization: 'test-org'
  }
  const onOpenChoosePreviewImage = () => {
    throw new Error('should not be called')
  }
  const loadPreviewImage = () => {}
  const previewImage = {
    hash: '7cb0101d53f1579c0e0da11f2407146eebeca638',
    format: 'image/png'
  }

  const props = {
    auth,
    operations,
    router,
    stacks,
    onOpenChoosePreviewImage,
    loadPreviewImage,
    previewImage,
    stackOptions
  }

  const component = renderer.create(
    <MemoryRouter>
      <NewStack {...props} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('NewStack does render with stacks', () => {
  const auth = {
    organization: 'test-org'
  }
  const onOpenChoosePreviewImage = () => {
    throw new Error('should not be called')
  }
  const loadPreviewImage = () => {}
  const previewImage = {
    hash: '7cb0101d53f1579c0e0da11f2407146eebeca638',
    format: 'image/png'
  }
  const stacks = {
    items: [
      {name: 'stack-a'},
      {name: 'stack-b'},
      {name: 'stack-c'}
    ]
  }

  const props = {
    auth,
    operations,
    router,
    stacks,
    onOpenChoosePreviewImage,
    loadPreviewImage,
    previewImage,
    stackOptions
  }

  const component = renderer.create(
    <MemoryRouter>
      <NewStack {...props} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('newStack does render with clone stack props', () => {
  const auth = {
    organization: 'test-org'
  }
  const stackClone = cloneStack
  const onOpenChoosePreviewImage = () => {
    throw new Error('should not be called')
  }
  const loadPreviewImage = () => {}

  const props = {
    auth,
    operations,
    stackClone,
    router,
    stacks,
    onOpenChoosePreviewImage,
    loadPreviewImage
  }

  const WrappedNewStack = wrapInTestContext(NewStack)
  const component = renderer.create(
    <MemoryRouter>
      <WrappedNewStack {...props} />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
