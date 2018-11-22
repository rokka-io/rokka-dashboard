import React from 'react'
import PreviewSidebar from './PreviewSidebar'
import renderer from 'react-test-renderer'

test('PreviewSidebar does not render when no previewImage set', () => {
  const props = {
    organization: 'test-organization',
    onChange: () => {
      throw new Error('should not be called')
    }
  }
  const component = renderer.create(<PreviewSidebar {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('PreviewSidebar does render with previewImage set', () => {
  const props = {
    organization: 'test-organization',
    onChange: () => {
      throw new Error('should not be called')
    },
    previewImage: {
      hash: 'previewImage-hash',
      format: 'png'
    }
  }
  const component = renderer.create(<PreviewSidebar {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('PreviewSidebar does render with currentPreviewImage set', () => {
  const props = {
    organization: 'test-organization',
    onChange: () => {
      throw new Error('should not be called')
    },
    previewImage: {
      hash: 'previewImage-hash',
      format: 'png'
    },
    currentPreviewImage: {
      src: 'https://example.com/current-preview-image.png'
    }
  }
  const component = renderer.create(<PreviewSidebar {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('PreviewSidebar does render with error set', () => {
  const props = {
    organization: 'test-organization',
    onChange: () => {
      throw new Error('should not be called')
    },
    previewImage: {
      hash: 'previewImage-hash',
      format: 'png'
    },
    error: 'Test error'
  }
  const component = renderer.create(<PreviewSidebar {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('PreviewSidebar does render with imageLoading set', () => {
  const props = {
    organization: 'test-organization',
    onChange: () => {
      throw new Error('should not be called')
    },
    previewImage: {
      hash: 'previewImage-hash',
      format: 'png'
    },
    imageLoading: true
  }
  const component = renderer.create(<PreviewSidebar {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
