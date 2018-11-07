import React from 'react'
import Sepia from '../../../src/components/operations/Sepia'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

test('Sepia does render', () => {
  const sepiaValues = {}

  const component = renderer.create(
    <Sepia values={sepiaValues} defaults={operations.sepia.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
