import React from 'react'
import FramelessLayout from '../../../src/components/layouts/FramelessLayout'
import renderer from 'react-test-renderer'

test('FramelessLayout does render', () => {
  const component = renderer.create(
    <FramelessLayout>
      <span>Test</span>
    </FramelessLayout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('FramelessLayout does render with alerts', () => {
  const component = renderer.create(
    <FramelessLayout alert={{ type: 'error', message: 'test' }}>
      <span>Test</span>
    </FramelessLayout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
