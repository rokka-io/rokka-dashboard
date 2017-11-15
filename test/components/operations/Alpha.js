import React from 'react'
import Alpha from '../../../src/components/operations/Alpha'
import renderer from 'react-test-renderer'

const alphaData = {
  values: {
    'mode': 'mask'
  },
  defaults: {
    'mode': {
      'default': 'mask',
      'values': [
        'mask',
        'remove',
        'extract'
      ]
    }
  }
}

test('Alpha does render', () => {
  const component = renderer.create(
    <Alpha values={alphaData.values} defaults={alphaData.defaults} required={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
