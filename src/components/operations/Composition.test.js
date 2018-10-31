import React from 'react'
import Composition from '../../../src/components/operations/Composition'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

const compositionValues = {
  mode: 'foreground',
  width: 1000,
  height: 1000,
  anchor: 'center',
  secondary_color: '222222',
  primary_color: '111111'
}

test('Composition does render', () => {
  const component = renderer.create(
    <Composition values={compositionValues} defaults={operations.composition.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
