import React from 'react'
import CropForm from './CropForm'
import renderer from 'react-test-renderer'

test('CropForm does render', () => {
  const component = renderer.create(<CropForm onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('CropForm does render with parameters', () => {
  const component = renderer.create(
    <CropForm onChange={() => {}} x={1} y={2} width={100} height={100} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('CropForm does render with parameters and disabled width/height setting', () => {
  const component = renderer.create(
    <CropForm onChange={() => {}} x={1} y={2} width={1} height={1} disableWidthHeight />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
