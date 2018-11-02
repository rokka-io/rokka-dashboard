import React from 'react'
import Header from '../../../src/components/newStack/Header'
import renderer from 'react-test-renderer'

test('Header does render with minimal props', () => {
  const props = {
    updatePreview: () => {
      throw new Error('Should not be called')
    }
  }
  const component = renderer.create(<Header {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Header does render with all props set', () => {
  const props = {
    updatePreview: () => {
      throw new Error('Should not be called')
    },
    previewImage: {
      hash: 'foo'
    },
    createStackBtnDisabled: true,
    isPreviewCurrent: true,
    showLoader: true
  }
  const component = renderer.create(<Header {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
