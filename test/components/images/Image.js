import React from 'react'
import { shallow } from 'enzyme'
import Image from '../../../src/components/images/Image'
import renderer from 'react-test-renderer'

test('Image does render with minimal props', () => {
  const component = renderer.create(
    <Image url="http://example.org/image.png" name="Example name" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Image does render with all props', () => {
  const component = renderer.create(
    <Image
      url="http://example.org/image.png"
      name="Example name"
      width={100}
      height={100}
      size={10000}
      format="png"
      uploaded
      onClick={() => {
        throw new Error('Should not be called')
      }}
      className="additional-classes"
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Image onError triggers an error', () => {
  const component = shallow(
    <Image
      url="http://example.org/image.png"
      name="Example name"
      width={100}
      height={100}
      size={10000}
      format="png"
      uploaded
      onClick={() => {
        throw new Error('Should not be called')
      }}
      className="additional-classes"
    />
  )

  expect(component.find('img').exists()).toBe(true)

  component.setState({imageError: true})

  expect(component.find('img').exists()).toBe(false)
})
