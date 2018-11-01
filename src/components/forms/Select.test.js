import React from 'react'
import Select from '../../../src/components/forms/Select'
import renderer from 'react-test-renderer'

test('Select does render', () => {
  const component = renderer.create(<Select onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select does render with options', () => {
  const component = renderer.create(
    <Select onChange={() => {}}>
      <option value="test">Test</option>
      <option value="test2">Test2</option>
    </Select>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select does forward props', () => {
  const component = renderer.create(<Select foo="bar" onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select takes only value if not disabled', () => {
  const component = renderer.create(<Select defaultValue="DefaultValue" />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select takes defaultValue if disabled', () => {
  const component = renderer.create(<Select defaultValue="DefaultValue" disabled />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select shows placeholder', () => {
  const component = renderer.create(<Select placeholder="Placeholder" onChange={() => {}} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select shows placeholder with default value', () => {
  const component = renderer.create(
    <Select defaultValue="DefaultValue" placeholder="Placeholder" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select takes name as placeholder if no placeholder given', () => {
  const component = renderer.create(
    <Select defaultValue="DefaultValue" name="Name" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select takes type as placeholder if no placeholder & name given', () => {
  const component = renderer.create(
    <Select defaultValue="DefaultValue" type="Type" onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Select is disabled if there is no onChange func', () => {
  const component = renderer.create(<Select />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
