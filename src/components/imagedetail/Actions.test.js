import React from 'react'
import Actions from '../../../src/components/imagedetail/Actions'
import { FOCUS_POINT, FOCUS_AREA } from '../../../src/components/imagedetail/constants'
import renderer from 'react-test-renderer'

test('Actions does render', () => {
  const component = renderer.create(
    <Actions menuActive actionsActive onChange={() => {}} onToggleActions={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Actions does render with menu inactive', () => {
  const component = renderer.create(
    <Actions menuActive={false} actionsActive onChange={() => {}} onToggleActions={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Actions does render with menu/actions inactive', () => {
  const component = renderer.create(
    <Actions
      menuActive={false}
      actionsActive={false}
      onChange={() => {}}
      onToggleActions={() => {}}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Actions does render with focus area', () => {
  const component = renderer.create(
    <Actions
      menuActive
      actionsActive
      onChange={() => {}}
      onToggleActions={() => {}}
      focusType={FOCUS_AREA}
      focusArea={{
        x: 1,
        y: 1,
        width: 100,
        height: 100
      }}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Actions does render with focus point', () => {
  const component = renderer.create(
    <Actions
      menuActive
      actionsActive
      onChange={() => {}}
      onToggleActions={() => {}}
      focusType={FOCUS_POINT}
      focusArea={{
        x: 1,
        y: 1,
        width: 1,
        height: 1
      }}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
