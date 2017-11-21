import React from 'react'
import Sepia from '../../../src/components/operations/Sepia'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const sepiaValues = {
  fuzzy: '10'
}

test('Sepia does render', () => {
  const component = renderer.create(
    <Sepia values={sepiaValues} defaults={operations.sepia.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
