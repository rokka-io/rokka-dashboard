import React from 'react'
import renderer from 'react-test-renderer'
import Modal from './Modal'

test('Modal renders when open', () => {
  const component = renderer.create(
    <Modal>
      <p>Modal content</p>
    </Modal>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('Modal renders nothing when open is false', () => {
  const component = renderer.create(
    <Modal open={false}>
      <p>Modal content</p>
    </Modal>
  )
  expect(component.toJSON()).toBeNull()
})

test('Modal renders with fullscreen prop', () => {
  const component = renderer.create(
    <Modal fullscreen>
      <p>Fullscreen modal</p>
    </Modal>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('Modal renders with custom classNames', () => {
  const component = renderer.create(
    <Modal classNames={{ backdrop: 'custom-backdrop', frame: 'custom-frame' }}>
      <p>Styled modal</p>
    </Modal>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('Modal close button calls onClose callback', () => {
  const onClose = jest.fn()
  const component = renderer.create(
    <Modal onClose={onClose}>
      <p>Modal content</p>
    </Modal>
  )
  const closeButton = component.root.findByProps({ title: 'Close' })
  renderer.act(() => {
    closeButton.props.onClick({ preventDefault: () => {} })
  })
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('Modal renders nothing after close button is clicked', () => {
  const component = renderer.create(
    <Modal>
      <p>Modal content</p>
    </Modal>
  )
  const closeButton = component.root.findByProps({ title: 'Close' })
  renderer.act(() => {
    closeButton.props.onClick({ preventDefault: () => {} })
  })
  expect(component.toJSON()).toBeNull()
})
