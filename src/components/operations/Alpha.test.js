import React from 'react'
import Alpha from '../../../src/components/operations/Alpha'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

test('Alpha does render', () => {
  const component = renderer.create(
    <Alpha
      values={operations.alpha.properties.mode}
      defaults={operations.alpha.properties}
      required={[]}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
