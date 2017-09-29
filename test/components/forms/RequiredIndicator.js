import React from 'react'
import RequiredIndicator from '../../../src/components/forms/RequiredIndicator'
import renderer from 'react-test-renderer'

test('RequiredIndicator does render', () => {
  const component = renderer.create(
    <RequiredIndicator />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('RequiredIndicator does render with required', () => {
  const component = renderer.create(
    <RequiredIndicator required />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
