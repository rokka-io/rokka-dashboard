import React from 'react'
import Input from '../../../src/components/forms/Input'
import renderer from 'react-test-renderer'

test('Input does render', () => {
  const component = renderer.create(<Input onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input does render with a value', () => {
  const component = renderer.create(<Input value="test" onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input does forward props', () => {
  const component = renderer.create(<Input foo="bar" onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input takes only value if not disabled', () => {
  const component = renderer.create(<Input defaultValue="DefaultValue" />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input takes defaultValue if disabled', () => {
  const component = renderer.create(<Input defaultValue="DefaultValue" disabled />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input shows placeholder', () => {
  const component = renderer.create(<Input placeholder="Placeholder" onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input shows placeholder with default value', () => {
  const component = renderer.create(
    <Input defaultValue="DefaultValue" placeholder="Placeholder" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input takes name as placeholder if no placeholder given', () => {
  const component = renderer.create(
    <Input defaultValue="DefaultValue" name="Name" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input takes type as placeholder if no placeholder & name given', () => {
  const component = renderer.create(
    <Input defaultValue="DefaultValue" type="Type" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Input is disabled if there is no onChange func', () => {
  const component = renderer.create(<Input />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
