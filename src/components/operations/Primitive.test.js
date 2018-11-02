import React from 'react'
import Primitive from '../../../src/components/operations/Primitive'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

test('Primitive does render', () => {
  const primitiveValues = {}
  const component = renderer.create(
    <Primitive values={primitiveValues} defaults={operations.primitive.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Primitive does render with threshold values', () => {
  const primitiveValues = {
    count: 30,
    mode: 5
  }
  const component = renderer.create(
    <Primitive values={primitiveValues} defaults={operations.primitive.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
