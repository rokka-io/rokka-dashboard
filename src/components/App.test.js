import React from 'react'
import App from '../../src/components/App'
import renderer from 'react-test-renderer'

test('App does render', () => {
  const component = renderer.create(
    <App>
      <span>Test</span>
    </App>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
