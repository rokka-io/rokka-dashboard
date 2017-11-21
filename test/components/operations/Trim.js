import React from 'react'
import Trim from '../../../src/components/operations/Trim'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const trimValues = {
  fuzzy: '10'
}

test('Trim does render', () => {
  const component = renderer.create(
    <Trim values={trimValues} defaults={operations.trim.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
