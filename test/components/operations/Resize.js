import React from 'react'
import Resize from '../../../src/components/operations/Resize'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

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

// deprecated, remove after 2018-06-01
test('Resize does render with filter value', () => {
  const resizeValues = {
    width: 1000,
    height: 1000,
    upscale: true,
    upscale_dpr: true,
    mode: 'box',
    filter: 'box'
  }
  const component = renderer.create(
    <Resize values={resizeValues} defaults={operations.resize.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
