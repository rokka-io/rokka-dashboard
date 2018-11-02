import React from 'react'
import Dropshadow from '../../../src/components/operations/Dropshadow'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

const dropshadowValues = {
  horizontal: 10,
  vertical: 10,
  opacity: 100,
  sigma: 0.5,
  blur_radius: 2,
  color: ''
}

test('Dropshadow does render', () => {
  const component = renderer.create(
    <Dropshadow
      values={dropshadowValues}
      defaults={operations.dropshadow.properties}
      required={[]}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
