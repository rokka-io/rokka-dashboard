import React from 'react'
import Alpha from '../../../src/components/operations/Alpha'
import renderer from 'react-test-renderer'

test('Alpha does render', () => {
  const component = renderer.create(
    <Alpha values={{'mode': 'mask'}} defaults={{
      'mode': {
        'default': 'mask',
        'values': [
          'mask',
          'remove',
          'extract'
        ]
      }}} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
