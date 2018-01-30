import React from 'react'
import Primitive from '../../../src/components/operations/Primitive'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const primitiveValues = {
  count: 30,
  mode: 5
}

test('Primitive does render', () => {
  const component = renderer.create(
    <Primitive values={primitiveValues} defaults={operations.primitive.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
