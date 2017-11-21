import React from 'react'
import Rotate from '../../../src/components/operations/Rotate'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const rotateValues = {
  angle: 35,
  background_color: '000000',
  background_opacity: 0.8
}

test('Rotate does render', () => {
  const component = renderer.create(
    <Rotate values={rotateValues} defaults={operations.rotate.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
