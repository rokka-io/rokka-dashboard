import React from 'react'
import Footer from './Footer'
import renderer from 'react-test-renderer'

test('Footer does render', () => {
  const component = renderer.create(<Footer />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
