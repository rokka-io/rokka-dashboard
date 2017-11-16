import React from 'react'
import AutoRotate from '../../../src/components/operations/AutoRotate'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const autoRotateValues = {
  width: '1000',
  height: '2000',
  rotation_direction: 'clockwise'
}

test('Autorotate does render', () => {
  const component = renderer.create(
    <AutoRotate values={autoRotateValues} defaults={operations.autorotate.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
