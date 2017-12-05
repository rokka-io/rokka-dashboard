import React from 'react'
import Sepia from '../../../src/components/operations/Sepia'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

test('Sepia does render', () => {
  const sepiaValues = {}

  const component = renderer.create(
    <Sepia values={sepiaValues} defaults={operations.sepia.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// deprecated, remove after 2018-06-01
test('Sepia does render with threshold value', () => {
  const sepiaValues = {
    threshold: '10'
  }

  const component = renderer.create(
    <Sepia values={sepiaValues} defaults={operations.sepia.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
