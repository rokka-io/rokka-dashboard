import React from 'react'
import Header from './Header'
import renderer from 'react-test-renderer'

test('Header does render with minimal props', () => {
  const component = renderer.create(<Header title="Test">Test</Header>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
