import React from 'react'
import Blur from '../../../src/components/operations/Blur'
import renderer from 'react-test-renderer'
import operations from '../../__tests__/operations.json'

test('Blur does render', () => {
  const blurValues = {
    sigma: 10
  }

  const component = renderer.create(
    <Blur values={blurValues} defaults={operations.blur.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
