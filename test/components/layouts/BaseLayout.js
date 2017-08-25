import React from 'react'
import Header from '../../src/components/Header'
import renderer from 'react-test-renderer'

test('Header does render', () => {
  const component = renderer.create(
    <Header auth={{organization: 'test-organization'}} active={false} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Header does render in active mode', () => {
  const component = renderer.create(
    <Header auth={{organization: 'test-organization'}} active />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
