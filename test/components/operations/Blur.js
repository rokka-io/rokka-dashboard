import React from 'react'
import Blur from '../../../src/components/operations/Blur'
import renderer from 'react-test-renderer'
import operations from '../../operations.json'

const blurValues = {
  radius: 10,
  sigma: 10
}

test('Blur does render', () => {
  const component = renderer.create(
    <Blur values={blurValues} defaults={operations.blur.properties} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
