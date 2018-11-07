import React from 'react'
import Resize from '../../../src/components/operations/Resize'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

test('Resize does render', () => {
  const resizeValues = {
    width: 1000,
    height: 1000,
    upscale: true,
    upscale_dpr: true,
    mode: 'box'
  }
  const component = renderer.create(
    <Resize values={resizeValues} defaults={operations.resize.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
