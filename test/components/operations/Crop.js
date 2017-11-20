import React from 'react'
import Crop from '../../../src/components/operations/Crop'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const cropValues = {
  width: 1000,
  height: 1000,
  anchor: 'center'
}

test('Crop does render', () => {
  const component = renderer.create(
    <Crop values={cropValues} defaults={operations.crop.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
